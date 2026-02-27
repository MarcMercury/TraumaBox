"use client";

const PRODUCTS = [
  {
    id: "TK-001",
    name: "Trauma Box Starter Kit",
    price: "$29.99",
    status: "IN STOCK",
    description: "Everything you need to begin your journey into emotional damage. Includes one (1) copy of our flagship story and a complimentary existential crisis.",
    sideEffects: "Buyer's remorse, strange sense of satisfaction",
  },
  {
    id: "TK-002",
    name: "ATCS: Complete Collection (Print)",
    price: "$49.99",
    status: "PRE-ORDER",
    description: "All Absolutely Terrible Children's Stories in one beautifully bound volume. Makes a terrible gift for baby showers.",
    sideEffects: "Awkward silences at family gatherings",
  },
  {
    id: "TK-003",
    name: "Trauma Box T-Shirt",
    price: "$24.99",
    status: "IN STOCK",
    description: "Wear your emotional damage on the outside for once. 100% cotton. 0% appropriate for parent-teacher conferences.",
    sideEffects: "Unsolicited conversations with strangers",
  },
  {
    id: "TK-004",
    name: "Trauma Mug: 'This Is Fine'",
    price: "$16.99",
    status: "IN STOCK",
    description: "For your morning coffee or evening tears. Microwave safe. Emotionally unsafe.",
    sideEffects: "Colleagues asking if you're okay",
  },
  {
    id: "TK-005",
    name: "Panic Button (Physical)",
    price: "$12.99",
    status: "SOLD OUT",
    description: "A real, physical panic button for your desk. Press it. Nothing happens. Just like real life.",
    sideEffects: "Temporary illusion of control",
  },
  {
    id: "TK-006",
    name: "Redacted Sticker Pack",
    price: "$8.99",
    status: "IN STOCK",
    description: "50 black bar stickers to redact anything in your life you'd rather not deal with. Laptop, fridge, marriage certificate — the possibilities are endless.",
    sideEffects: "Mild vandalism, plausible deniability",
  },
];

export default function ShopPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 bg-yellow-500" />
        <h1 className="text-3xl sm:text-4xl font-sans text-yellow-500 tracking-wider">
          SUBSTANDARD GOODS
        </h1>
      </div>
      <p className="font-mono text-xs text-[#555] ml-5 mb-2">
        THE TRAUMA KIT — PHYSICAL ARTIFACTS OF QUESTIONABLE VALUE
      </p>
      <p className="font-mono text-[10px] text-[#444] ml-5 mb-8">
        ALL SALES: FINAL. ALL REFUNDS: DENIED. ALL COMPLAINTS: IGNORED.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="case-file p-4 glitch-hover flex flex-col">
            {/* Product header */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-[#555]">
                SKU: {product.id}
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                  product.status === "IN STOCK"
                    ? "text-[var(--terminal-green)] border-[var(--terminal-green)]"
                    : product.status === "PRE-ORDER"
                    ? "text-yellow-500 border-yellow-500"
                    : "text-red-500 border-red-500"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* Product image placeholder */}
            <div className="w-full h-32 bg-[#111] border border-[#222] mb-3 flex items-center justify-center">
              <span className="text-4xl opacity-20">☢</span>
            </div>

            {/* Info */}
            <h3 className="font-sans text-lg text-white mb-1">{product.name}</h3>
            <p className="font-mono text-xs text-[#888] mb-3 leading-relaxed flex-1">
              {product.description}
            </p>

            <div className="space-y-1 border-t border-[#222] pt-3 mb-4">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#555]">SIDE EFFECTS:</span>
                <span className="text-[#777] text-right max-w-[60%]">
                  {product.sideEffects}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="font-mono text-lg text-[var(--accent)] font-bold">
                {product.price}
              </span>
              <button
                className={`px-4 py-2 font-mono text-xs tracking-wider border transition-all ${
                  product.status === "SOLD OUT"
                    ? "border-[#333] text-[#444] cursor-not-allowed"
                    : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                }`}
                disabled={product.status === "SOLD OUT"}
              >
                {product.status === "SOLD OUT"
                  ? "UNAVAILABLE"
                  : product.status === "PRE-ORDER"
                  ? "PRE-ORDER"
                  : "ACQUIRE"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-[#222] bg-[#0d0d0d] p-4 font-mono text-[10px] text-[#555]">
        <p>
          DISCLAIMER: Trauma Box Industries is not responsible for any emotional,
          psychological, or social damage resulting from the purchase or use of
          these products. By clicking &quot;ACQUIRE&quot; you acknowledge that you have poor
          judgment and we respect that about you.
        </p>
      </div>
    </div>
  );
}
