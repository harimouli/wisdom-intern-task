
import React from 'react';

const Context = React.createContext({
    isDark: false,
    toggleTheme: () => {}
});

export default Context;
