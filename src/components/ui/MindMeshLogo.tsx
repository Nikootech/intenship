import React from 'react';

interface MindMeshLogoProps {
    className?: string;
    variant?: 'light' | 'dark'; // 'light' for dark backgrounds, 'dark' for light backgrounds
}

export const FullLogo: React.FC<MindMeshLogoProps> = ({ className = "h-10" }) => {
    // If the user provided a specific logo.png, we use it.
    // We assume logo.png is the full logo.
    // If we need to invert it for dark mode (assuming logo is dark text), we can use filters.
    // However, if the logo contains colors (Red box), full inversion shifts the hue.
    // Ideally we'd have logo-light.png and logo-dark.png.
    // For now, we render logo.png. 
    
    return (
        <img 
            src="/logo.png" 
            alt="Mind Mesh" 
            className={`object-contain dark:logo-invert ${className}`}
        />
    );
};

// Also export as default for backward compatibility with imports
const MindMeshLogo: React.FC<MindMeshLogoProps> = (props) => <FullLogo {...props} />;

export default MindMeshLogo;
