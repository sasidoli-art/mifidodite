import Link from "next/link";

const CATEGORIES = [
  {
    emoji: "🏠",
    label: "Pensioni",
    desc: "Lascia il tuo amico in mani sicure",
    href: "/professionisti?cat=pensione",
    color: "bg-orange-50 hover:bg-orange-100",
  },
  {
    emoji: "🏖️",
    label: "Spiagge dog-friendly",
    desc: "Mare e sabbia anche per lui",
    href: "/spiagge",
    color: "bg-blue-50 hover:bg-blue-100",
  },
  {
    emoji: "✂️",
    label: "Toelettatura",
    desc: "Bello, pulito e coccolato",
    href: "/professionisti?cat=toelettatura",
    color: "bg-pink-50 hover:bg-pink-100",
  },
  {
    emoji: "🐕",
    label: "Dog sitter",
    desc: "Come stare a casa, ma meglio",
    href: "/professionisti?cat=dog_sitter",
    color: "bg-green-50 hover:bg-green-100",
  },
  {
    emoji: "🎓",
    label: "Educatori cinofili",
    desc: "Per un cane felice e equilibrato",
    href: "/professionisti?cat=educatore_cinofilo",
    color: "bg-purple-50 hover:bg-purple-100",
  },
  {
    emoji: "🏥",
    label: "Veterinari",
    desc: "La salute prima di tutto",
    href: "/professionisti?cat=veterinario",
    color: "bg-red-50 hover:bg-red-100",
  },
  {
    emoji: "📸",
    label: "Fotografi pet",
    desc: "Ricordi a 4 zampe",
    href: "/professionisti?cat=fotografo_pet",
    color: "bg-yellow-50 hover:bg-yellow-100",
  },
  {
    emoji: "🚗",
    label: "Pet taxi",
    desc: "Trasporto sicuro e confortevole",
    href: "/professionisti?cat=pet_taxi",
    color: "bg-teal-50 hover:bg-teal-100",
  },
];

export function Categories() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Cosa stai cercando?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Esplora per categoria e trova il professionista giusto
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`${cat.color} rounded-2xl p-6 text-center transition-all hover:shadow-md group`}
            >
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <h3 className="font-semibold text-foreground mb-1">
                {cat.label}
              </h3>
              <p className="text-sm text-muted-foreground">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
