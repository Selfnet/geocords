function Header() {
  return (
    <header
      class="container mb-16 flex h-20 items-center justify-between space-x-4 border-b md:h-28"
      aria-label="Header"
    >
      <a class="font-outfit text-2xl font-semibold !no-underline transition-colors duration-100" href="/">
        Geocords
      </a>
    </header>
  );
}

export default Header;
