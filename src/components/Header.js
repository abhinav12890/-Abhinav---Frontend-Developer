import { Link } from "react-router-dom"
import { SiSpacex } from "react-icons/si"

export default function Header() {
  return (
    <>
      <header className="absolute flex items-center justify-between px-5 w-full">
        <div>
          <Link to="/">
            <SiSpacex className="text-8xl text-white" />
          </Link>
        </div>
      </header>
    </>
  )
}
