export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Hongwei Qiu. All rights reserved.
          </p>
          <a
            href="https://github.com/yourusername/qiiiu_page"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            View Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

