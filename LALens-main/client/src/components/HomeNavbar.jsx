import { Link, NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

const links = [
  { to: "/platform", label: "Platform" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/simulator", label: "Simulator" },
  { to: "/pipeline", label: "Pipeline" },
  { to: "/chat", label: "AI Chat" }
];

function HomeNavbar() {
  return (
    <header className="home-nav">
      <div className="home-nav-inner">
        <Link to="/" className="home-brand">
          <span className="home-brand-icon">
            <BrandLogo variant="nav" loading="eager" fetchPriority="high" />
          </span>
          <span className="home-brand-text">
            <span className="home-brand-title">LALens</span>
            <span className="home-brand-sub">Education Intelligence Engine</span>
          </span>
        </Link>
        <nav className="home-nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "active" : "")}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/dashboard" className="home-cta">
          View Dashboard
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </header>
  );
}

export default HomeNavbar;
