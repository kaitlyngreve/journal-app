

function Header({ user, todayDate }) {
    return (
        <div className="header-container">
            <h1 className='header'>👋 Hello, {user.displayName}.</h1>
            <h3 className='currentDate'>🗓 Today's date is {todayDate}</h3>
        </div>

    )
}

export default Header;