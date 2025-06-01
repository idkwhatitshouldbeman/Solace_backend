// Theme configuration with beige and flowy design elements
const theme = {
  colors: {
    primary: '#E8D9C5', // Light beige
    secondary: '#C8B6A6', // Darker beige
    accent: '#A4907C', // Brown accent
    text: '#4D4639', // Dark brown text
    lightText: '#8D7B68', // Light brown text
    background: '#F8F4EA', // Very light beige background
    white: '#FFFFFF',
    error: '#D9614C',
    success: '#88A47C',
    warning: '#E6B566',
    darkMode: {
      primary: '#3C3527',
      secondary: '#4D4639',
      accent: '#8D7B68',
      text: '#F8F4EA', // White text for dark mode
      lightText: '#E8D9C5',
      background: '#2A2520', // Dark background
    }
  },
  fonts: {
    body: "'Quicksand', sans-serif",
    heading: "'Playfair Display', serif",
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    pill: '50px',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
    large: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: '0.3s ease',
    slow: '0.5s ease',
    fast: '0.2s ease',
  },
  // Flowy design elements
  flowElements: {
    wavyBorder: `
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 10px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23E8D9C5'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23E8D9C5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23E8D9C5'%3E%3C/path%3E%3C/svg%3E");
        background-size: cover;
        background-repeat: no-repeat;
      }
    `,
    gradientBackground: `
      background: linear-gradient(135deg, #F8F4EA 0%, #E8D9C5 100%);
    `,
    softShadow: `
      box-shadow: 0 8px 32px rgba(77, 70, 57, 0.1);
    `,
    curvedCorners: `
      border-radius: 30px;
    `,
    flowyButton: `
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: all 0.5s ease;
      }
      &:hover:before {
        left: 100%;
      }
    `
  }
};

export default theme;
