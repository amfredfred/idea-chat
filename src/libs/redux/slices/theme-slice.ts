import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ThemeStyles {
    bgColor: string;
    textColor: string;
    buttonColor: string;
}

interface Theme {
    name: string;
    styles: ThemeStyles;
    class: string;
}

interface ThemeState {
    current: Theme;
    themes: Theme[];
}

const virtuals: Theme[] = [
    {
        name: 'rem',
        styles: {
            bgColor: "#0000FF",
            textColor: "#ffffff",
            buttonColor: "#0000FF",
        },
        class: 'bg-[#0000FF] text-white p-[5px] lg:p-2 rounded-[3px] text-[8px] lg:text-[10px] cursor-pointer'
    },
    {
        name: 'neo',
        styles: {
            bgColor: "#000000",
            textColor: "#00FF00",
            buttonColor: "#000000",
        },
        class: 'bg-[#000000] text-[#00FF00] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
    },
    {
        name: 'oen',
        styles: {
            bgColor: "#00FF00",
            textColor: "#000000",
            buttonColor: "#00FF00",
        },
        class: 'bg-[#00FF00] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
    },
    {
        name: 'hmmm',
        styles: {
            bgColor: "#FF5959",
            textColor: "#ffffff",
            buttonColor: "#000000",
        },
        class: 'bg-[#FF5959] text-[#3D3D3D] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
    },
    {
        name: 'B/W',
        styles: {
            bgColor: "#ffffff",
            textColor: "#000000",
            buttonColor: "#000000",
        },
        class: 'bg-[#ffffff] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] border border-black cursor-pointer'
    }
];

const initialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : virtuals[0];
};

const initialState: ThemeState = {
    current: initialTheme(),
    themes: virtuals
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            const selectedTheme = state.themes.find(virtual => virtual.name === action.payload);
            if (selectedTheme) {
                state.current = selectedTheme;
                localStorage.setItem('theme', JSON.stringify(selectedTheme));
            } else {
                console.warn(`Theme with name "${action.payload}" not found`);
            }
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;