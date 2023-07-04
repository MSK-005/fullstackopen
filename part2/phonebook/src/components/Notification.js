const Notification = ({message, category}) => {
    if (message === null) {
        return null
    }
    
    else if (category === 'success' && message !== null ) {
        return (
            <div className="notification__container notification__container--success">
                <h3 className="notification__text--success">{message}</h3>
            </div>
        )
    }

    else if (category === 'error' && message !== null) {
        return (
            <div className="notification__container notification__container--error">
                <h3 className="notification__text--error">{message}</h3>
            </div>
        )
    }
}

export default Notification