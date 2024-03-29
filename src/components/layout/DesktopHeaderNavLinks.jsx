import Link from "next/link"

const DesktopHeaderNavLinks = () => {
  return (
    <>
        <Link 
        href={'/'}
        >
            Home
        </Link>
        <Link
        href={'/menu'}
        >
            Menu
        </Link>
        <Link 
        href={'/#about'}
        >
            About
        </Link>
        <Link 
        href={'/#contact'}
        >
            Contact
        </Link>
    </>
    
  )
}

export default DesktopHeaderNavLinks;