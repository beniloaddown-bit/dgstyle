import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartLine = { id: string; size: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string, size: string) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  detailed: { line: CartLine; product: Product }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dgstyle-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { line, product } : null;
      })
      .filter((v): v is { line: CartLine; product: Product } => v !== null);

    return {
      lines,
      detailed,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: detailed.reduce((sum, d) => sum + d.product.price * d.line.qty, 0),
      add: (id, size) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id && l.size === size);
          if (found) {
            return prev.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l));
          }
          return [...prev, { id, size, qty: 1 }];
        }),
      remove: (id, size) =>
        setLines((prev) => prev.filter((l) => !(l.id === id && l.size === size))),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
