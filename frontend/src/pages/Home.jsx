import { useRef } from 'react';
import { Link } from 'react-router-dom';
import VaultScene from '../experience/VaultScene';
import { vaultServices, vaultStats } from '../experience/homeData';
import {
  useIsMobileViewport,
  useReducedMotion,
  useScrollProgress,
  useWebGLAvailable,
} from '../experience/useScrollProgress';
import { useHomeLenis } from '../experience/useHomeLenis';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function MandateStructure({ service }) {
  return (
    <div className={`vault-service-art vault-art-${service.id}`} aria-hidden="true">
      {service.id === 'real-estate' && (
        <div className="vault-art-skyline">
          <i />
          <i />
          <i />
          <i />
          <i />
          <b />
        </div>
      )}
      {service.id === 'gold-loans' && (
        <div className="vault-art-gold">
          <i />
          <i />
          <i />
          <i />
          <b />
        </div>
      )}
      {service.id === 'asset-management' && (
        <div className="vault-art-dubai">
          <i />
          <i />
          <i />
          <b />
        </div>
      )}
      {service.id === 'smart-connect' && (
        <div className="vault-art-network">
          <i />
          <i />
          <i />
          <i />
          <b />
          <b />
          <b />
        </div>
      )}
      {service.id === 'fnb' && (
        <div className="vault-art-fnb">
          <i />
          <i />
          <i />
          <b />
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const pageRef = useRef(null);
  const progress = useScrollProgress(pageRef);
  const reducedMotion = useReducedMotion();
  const webglAvailable = useWebGLAvailable();
  const isMobile = useIsMobileViewport();
  const { scrollTo } = useHomeLenis(reducedMotion, pageRef);
  useScrollAnimation();

  const activeIndex = Math.min(
    vaultServices.length - 1,
    Math.max(0, Math.round(progress * (vaultServices.length - 1)))
  );
  const scrollActiveId = vaultServices[activeIndex].id;
  const canRender3d = webglAvailable && !reducedMotion;

  const handleSelect = (service) => {
    const target = document.getElementById(`vault-service-${service.id}`);
    if (target) scrollTo(target);
  };

  return (
    <div ref={pageRef} className="vault-page">
      <section
        className={`vault-home${canRender3d ? '' : ' vault-home-static'}`}
        aria-label="Crownstone immersive vault experience"
      >
        <div className="vault-sticky" style={{ '--vault-progress': progress }}>
          {canRender3d ? (
            <VaultScene
              progress={progress}
              services={vaultServices}
              activeId={scrollActiveId}
              selectedId={null}
              onSelect={handleSelect}
              isMobile={isMobile}
            />
          ) : (
            <div className="vault-static-scene" role="img" aria-label="JB Crownstone crest and service vault">
              <img src="/yo2.png" alt="Logo" />
              <div className="vault-static-lines" aria-hidden="true" />
            </div>
          )}

          <div className="vault-vignette" aria-hidden="true" />

          <div className="vault-hud">
            <div className="vault-copy">
              <h1>Private wealth, structured with discipline.</h1>
              <p>
                A premium advisory house for private wealth, real assets, intelligent execution,
                and legacy-focused client mandates.
              </p>
              <div className="vault-stat-row" aria-label="Crownstone highlights">
                {vaultStats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="vault-actions">
              <Link to="/contact" className="vault-contact-link">
                Request Advisory
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="vault-journey" aria-label="Crownstone service journey">
        {vaultServices.map((service, index) => {
          const content = (
            <>
              <span>{service.status === 'Coming Soon' ? 'Join Waitlist' : 'Explore Mandate'}</span>
            </>
          );

          return (
            <article
              id={`vault-service-${service.id}`}
              className="vault-journey-panel animate"
              style={{ '--service-accent': service.accent }}
              key={service.id}
            >
              <div className="vault-journey-copy">
                <p className="vault-journey-index">
                  {String(index + 1).padStart(2, '0')} / {service.status}
                </p>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <div className="vault-journey-metrics">
                  {service.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
                {service.externalUrl ? (
                  <a
                    className="vault-journey-cta"
                    href={service.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <Link className="vault-journey-cta" to={service.route || '/contact'}>
                    {content}
                  </Link>
                )}
              </div>
              <div className="vault-journey-visual" aria-hidden="true">
                <div className={`vault-logo-stage vault-structure-stage vault-structure-${service.id}`}>
                  <MandateStructure service={service} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="vault-seo-section" aria-labelledby="vault-overview-title">
        <div className="container">
          <div className="vault-seo-header">
            <p className="label">Crownstone Mandates</p>
            <h2 id="vault-overview-title" className="heading">
              Private wealth services, designed as one connected platform.
            </h2>
            <p className="subheading">
              Explore the vault above or use the service paths below to move directly into the
              existing Crownstone advisory pages.
            </p>
          </div>

          <div className="vault-seo-grid">
            {vaultServices.map((service) => {
              const content = (
                <>
                  <span className="vault-seo-status">{service.status}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </>
              );

              return service.externalUrl ? (
                <a
                  key={service.id}
                  className="vault-seo-card"
                  href={service.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <Link key={service.id} className="vault-seo-card" to={service.route || '/contact'}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
