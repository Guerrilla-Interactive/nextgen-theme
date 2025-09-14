export type LogoProps = {
  /**
   * The fill color for the non-orange parts of the logo.
   * Set to "black" or "white".
   */
  nonOrangeColor?: "black" | "white" | string;
  /**
   * The fill color for the orange parts of the logo.
   * Set to a valid CSS color value.
   */
  orangeColor?: string;

  className?: string;
  
};

export default function Logo({  orangeColor = "#D76B01", nonOrangeColor = "black", className = "max-w-56" }: LogoProps) {
  // Use the prop value to fill non-orange parts.
  const secondaryFill = nonOrangeColor;

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg
      className={`${className}`}
      width="336"
      height="31"
      viewBox="0 0 336 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M0 0.779144L14.7307 30.9497L18.3169 24.1033L8.21244 0.779144H0Z"
          fill={orangeColor}
        />
        <path
          d="M16.1016 13.0546L19.6878 20.8712L29.4677 0.779297H21.3669L16.1016 13.0546Z"
          fill={orangeColor}
        />
        <path
          d="M45.0084 0.779297H36.6641V29.7234H45.0084V0.779297Z"
          fill={orangeColor}
        />
        <path
          d="M72.774 0.779297H64.4297V29.7234H72.774V0.779297Z"
          fill={orangeColor}
        />
        <path
          d="M96.6938 0.779297H88.9023V29.7234H96.6938V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M257.569 12.6025H249.453V29.7237H257.569V12.6025Z"
          fill={secondaryFill}
        />
        <path
          d="M257.569 0.779297H249.453V10.2447H257.569V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M267.446 17.9004H275.562V0.779259H267.446V17.9004Z"
          fill={secondaryFill}
        />
        <path
          d="M275.562 19.5797V12.6025L249.454 12.6025V19.5797H275.562Z"
          fill={secondaryFill}
        />
        <path
          d="M267.446 29.7236H275.562V21.9372H267.446V29.7236Z"
          fill={secondaryFill}
        />
        <path
          d="M57.2265 0.779297H47.2539V7.23868H57.2265V0.779297Z"
          fill={orangeColor}
        />
        <path
          d="M86.0343 0.779297H79.9727V7.82178H86.0343V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M105.529 0.779297H94.0547V7.82178H105.529V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M327.17 0.779297H319.379V29.7234H327.17V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M316.511 0.779297H310.449V7.82178H316.511V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M336.001 0.779297H324.527V7.82178H336.001V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M57.2265 23.2637H47.2539V29.7231H57.2265V23.2637Z"
          fill={orangeColor}
        />
        <path
          d="M55.5177 12.6377H42.9023V18.5793H55.5177V12.6377Z"
          fill={orangeColor}
        />
        <path
          d="M291.028 0.779297H282.684V29.7234H291.028V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M303.246 0.779297H293.273V7.23868H303.246V0.779297Z"
          fill={secondaryFill}
        />
        <path
          d="M303.246 23.2637H293.273V29.7231H303.246V23.2637Z"
          fill={secondaryFill}
        />
        <path
          d="M301.537 12.6377H288.922V18.5793H301.537V12.6377Z"
          fill={secondaryFill}
        />
        <path
          d="M120.514 9.56641H112.723V29.7237H120.514V9.56641Z"
          fill={secondaryFill}
        />
        <path
          d="M136.098 10.9634C136.098 13.7633 135.231 16.3118 133.369 18.1566C132.563 18.9559 131.625 19.6295 130.595 20.1271C129.24 20.7806 127.724 21.1526 126.121 21.1526H123.194V15.4874H123.828C124.675 15.4874 125.461 15.2311 126.126 14.8038C126.369 14.6429 126.598 14.462 126.801 14.2609C127.566 13.5069 128.038 12.4714 128.038 11.3253C128.038 9.03309 126.146 7.15308 123.828 7.15308H112.734V0.78418H124.756C130.402 0.78418 136.098 5.36355 136.098 10.9634Z"
          fill={secondaryFill}
        />
        <path
          d="M136.924 29.7232H127.879L123.187 21.7759V15.4824H123.821C124.668 15.4824 125.455 15.226 126.119 14.7988L127.732 16.2465L130.274 19.6395L130.588 20.1221L136.924 29.7182V29.7232Z"
          fill={secondaryFill}
        />
        <path
          d="M141.715 0.779297L152.961 20.0318L160.737 21.9218L150.566 0.779297H141.715Z"
          fill={secondaryFill}
        />
        <path
          d="M158.293 10.9635L161.859 18.192L172.08 0.784324L163.081 0.779297L158.293 10.9635Z"
          fill={secondaryFill}
        />
        <path
          d="M154.721 18.6289L152.961 20.0314V29.723H160.737V21.9214L154.721 18.6289Z"
          fill={secondaryFill}
        />
        <path
          d="M185.362 15.5831C185.362 11.1344 189.196 7.52017 193.919 7.52017C196.268 7.52017 198.393 8.40488 199.94 9.85258L204.424 4.13716C201.523 1.56346 197.632 -0.00488281 193.356 -0.00488281C184.367 -0.00488281 177.078 6.93204 177.078 15.4976C177.078 24.0632 184.367 30.9951 193.356 30.9951C194.477 30.9951 195.568 30.8845 196.633 30.6784V23.2288C195.781 23.5002 194.862 23.646 193.919 23.646C189.196 23.646 185.362 20.0318 185.362 15.5781V15.5831Z"
          fill={secondaryFill}
        />
        <path
          d="M202.101 13.2158H192.047V18.509H198.991V30.0454C201.791 29.0602 204.231 27.3611 206.062 25.1845V13.2158H202.096H202.101Z"
          fill={secondaryFill}
        />
        <path
          d="M221.549 15.5831C221.549 11.1344 225.384 7.52017 230.106 7.52017C232.455 7.52017 234.58 8.40488 236.128 9.85258L240.612 4.13716C237.71 1.56346 233.82 -0.00488281 229.543 -0.00488281C220.555 -0.00488281 213.266 6.93204 213.266 15.4976C213.266 24.0632 220.555 30.9951 229.543 30.9951C230.664 30.9951 231.755 30.8845 232.82 30.6784V23.2288C231.968 23.5002 231.05 23.646 230.106 23.646C225.384 23.646 221.549 20.0318 221.549 15.5781V15.5831Z"
          fill={secondaryFill}
        />
        <path
          d="M238.288 13.2158H228.234V18.509H235.179V30.0454C237.979 29.0602 240.419 27.3611 242.25 25.1845V13.2158H238.283H238.288Z"
          fill={secondaryFill}
        />
      </g>
      <defs>
        <clipPath id="clip0_299_2">
          <rect width="336" height="31" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
