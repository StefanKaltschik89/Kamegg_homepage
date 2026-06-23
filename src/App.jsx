const monthFormatter = new Intl.DateTimeFormat('de-DE', {
  month: 'long',
  year: 'numeric',
})

const today = new Date()
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
const leadingDays = (firstDay.getDay() + 6) % 7

const communityPoints = [
  {
    title: 'Ort mit Charakter',
    text: 'Kamegg steht im Zentrum der Seite und bekommt eine klare, ruhige Präsentation.',
  },
  {
    title: 'Für Bewohner und Gäste',
    text: 'Die Homepage eignet sich für lokale Informationen, Termine und Hinweise.',
  },
  {
    title: 'Schnell erweiterbar',
    text: 'Neue Inhalte, Bilder oder echte Veranstaltungsdaten lassen sich später leicht ergänzen.',
  },
]

const events = [
  {
    day: 5,
    time: '18:00',
    title: 'Dorfabend im Treffpunkt',
    category: 'Begegnung',
    location: 'Ortsmitte',
  },
  {
    day: 12,
    time: '09:30',
    title: 'Frühjahrsmarkt',
    category: 'Markt',
    location: 'Platz am Dorfkern',
  },
  {
    day: 18,
    time: '19:00',
    title: 'Abend der Vereine',
    category: 'Gemeinschaft',
    location: 'Mehrzweckraum',
  },
  {
    day: 26,
    time: '14:00',
    title: 'Familiennachmittag',
    category: 'Familie',
    location: 'Grünfläche',
  },
]

const eventDays = new Map(events.map((event) => [event.day, event]))
const heroImageSrc = `${import.meta.env.BASE_URL}media/kamegg-drone-placeholder.jpg`
const heroImageFallbackSrc = `${import.meta.env.BASE_URL}media/kamegg-drone-placeholder.svg`

const calendarCells = Array.from({ length: leadingDays + daysInMonth }, (_, index) => {
  const day = index - leadingDays + 1

  if (index < leadingDays) {
    return null
  }

  return day
})

function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Kamegg entdecken</p>
            <h1>Eine Homepage für Ort und Veranstaltungskalender.</h1>
            <p className="hero-copy">
              Diese Seite stellt Kamegg in den Mittelpunkt und bündelt die wichtigsten
              Termine in einer ruhigen, übersichtlichen Darstellung.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#kalender">
                Kalender ansehen
              </a>
              <a className="secondary-action" href="#kamegg">
                Kamegg entdecken
              </a>
            </div>
          </div>

          <figure className="hero-media">
            <img
              src={heroImageSrc}
              alt="Drohnenaufnahme von Kamegg"
              onError={(event) => {
                event.currentTarget.src = heroImageFallbackSrc
              }}
            />
          </figure>
        </div>
      </section>

      <section id="kamegg" className="feature-grid">
        {communityPoints.map((point) => (
          <article className="feature-card" key={point.title}>
            <h2>{point.title}</h2>
            <p>{point.text}</p>
          </article>
        ))}
      </section>

      <section id="kalender" className="calendar-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Veranstaltungskalender</p>
            <h2>{monthFormatter.format(today)}</h2>
          </div>
          <p className="section-copy">
            Eine kompakte Übersicht mit Monatsraster und den nächsten Terminen in Kamegg.
          </p>
        </div>

        <div className="calendar-layout">
          <article className="calendar-panel">
            <div className="calendar-weekdays" aria-hidden="true">
              <span>Mo</span>
              <span>Di</span>
              <span>Mi</span>
              <span>Do</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>So</span>
            </div>
            <div className="calendar-grid" role="grid" aria-label="Monatsübersicht">
              {calendarCells.map((day, index) => (
                <div className={`calendar-cell ${day ? '' : 'is-empty'}`} key={`${index}-${day ?? 'empty'}`}>
                  {day ? (
                    <>
                      <span className="calendar-day">{day}</span>
                      {eventDays.has(day) ? (
                        <span className="calendar-badge">{eventDays.get(day).category}</span>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </article>

          <aside className="event-list">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="event-date">
                  <span className="event-day">{event.day}</span>
                  <span className="event-time">{event.time} Uhr</span>
                </div>
                <div>
                  <p className="event-category">{event.category}</p>
                  <h3>{event.title}</h3>
                  <p className="event-location">{event.location}</p>
                </div>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <footer className="footer-note">
        Die Inhalte sind als klare Vorlage für Kamegg angelegt und können jederzeit mit echten Terminen ergänzt werden.
      </footer>
    </main>
  )
}

export default App