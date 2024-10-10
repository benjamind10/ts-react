import { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it

// Define props for a button, excluding 'to'
type ButtonProps = ComponentPropsWithoutRef<'button'> & { to?: never };

// Define props for a link, ensuring 'to' is required and using the right component props
type LinkProps = ComponentPropsWithoutRef<typeof Link> & { to: string };

// Type guard to check if props belong to a Link
function isLinkProps(props: ButtonProps | LinkProps): props is LinkProps {
  return 'to' in props;
}

// Button component that can render either a button or a link
export default function Button(props: ButtonProps | LinkProps) {
  if (isLinkProps(props)) {
    // Destructure 'to' and other props for clarity
    const { to, ...linkProps } = props;
    // Render Link if 'to' prop is present
    return <Link to={to} className='button' {...linkProps} />;
  }

  // Render button otherwise
  return <button className='button' {...props}></button>;
}
