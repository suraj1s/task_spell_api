const Navbar = () => {
    const navLinks = [
        {
            title : "Home",
            link : "/"
        },
        {
            title : "Favourites",
            link : "/favourites"
        },
        ]
  return (
    <div>
        {
            Array.isArray(navLinks) && 
            navLinks.map((item , index) => (
                <div key={index} >

                </div>
            ))
        }
    </div>
  )
}

export default Navbar