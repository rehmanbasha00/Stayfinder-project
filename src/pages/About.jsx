import { Users, Globe2, HeartHandshake } from 'lucide-react'

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 text-center dark:from-slate-900 dark:to-slate-950">
        <div className="container-app">
          <h1 className="section-title">About Stayfinder</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
            We're on a mission to make finding and booking the perfect stay simple, transparent, and enjoyable for
            every traveler.
          </p>
        </div>
      </section>

      <section className="container-app grid grid-cols-1 gap-6 py-14 sm:grid-cols-3">
        {[
          { icon: Users, title: '50,000+ travelers', desc: 'Trust Stayfinder for their trips every year' },
          { icon: Globe2, title: '200+ cities', desc: 'Hotels curated across destinations worldwide' },
          { icon: HeartHandshake, title: '4.8/5 rating', desc: 'Average rating from verified guests' },
        ].map((s) => (
          <div key={s.title} className="card p-6 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-slate-800">
              <s.icon size={22} />
            </span>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{s.title}</p>
            <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-slate-50 py-14 dark:bg-slate-900">
        <div className="container-app mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our story</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Stayfinder started as a small side project with a simple idea: booking a hotel shouldn't feel
            complicated. Today, we partner with hundreds of properties to bring honest reviews, fair pricing, and a
            seamless booking experience to every traveler.
          </p>
        </div>
      </section>
    </div>
  )
}
