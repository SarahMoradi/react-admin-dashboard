import { useAppContext } from "../contexts/app/app-context"

const ChangeTheme = () => {
    const {theme, changeTheme} = useAppContext()

    const changeThemeHandler = () => {
        changeTheme(theme === 'light'? 'dark' : 'light')
    }

    return(
        <button onClick={changeThemeHandler} data-theme={theme} className="theme-toggle">
            {theme === 'light' ? '🌚' : '🌝' }
        </button>
    )
}
export default ChangeTheme