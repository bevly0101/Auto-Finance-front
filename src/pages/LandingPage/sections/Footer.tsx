const Footer = () => (
  <footer className="border-t border-border/60 py-10 mt-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} AutoFinance. Todos os direitos reservados.</p>
      <nav className="flex items-center gap-6">
        <a href="/privacy" className="story-link">Privacidade</a>
        <a href="/terms" className="story-link">Termos</a>
        <a href="/about" className="story-link">Sobre nós</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
