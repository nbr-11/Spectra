import React, { useState } from "react";
import { themeContext } from "./context";

const ThemeProvider:React.FC<{children:React.ReactNode}> = ({children}) =>{
    const [isDark, setIsDark] = useState(false);
    return <themeContext.Provider value={{isDark, toggleTheme:setIsDark}}>
        {children}
    </themeContext.Provider>
}

export default ThemeProvider;