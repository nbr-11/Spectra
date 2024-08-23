import { createContext, useContext } from "react";

export const themeContext = createContext<{isDark:boolean, toggleTheme:any}>({
    isDark:false,
    toggleTheme:()=>{
        return;
    }
});

export const useTheme = () => {
    return useContext(themeContext);
}

