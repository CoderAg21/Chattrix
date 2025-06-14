import React from 'react'

export default function Footer() {
  return (

      <footer className="navbar fixed-bottom bg-black border-top border-light">
        <div className="container justify-content-center">
          <span className="navbar-text text-light small">
            © {new Date().getFullYear()} Chattrix — Made with <span className="text-danger">♥</span> by <strong className="text-warning">CoderAg</strong>
          </span>
        </div>
      </footer>
)
}
