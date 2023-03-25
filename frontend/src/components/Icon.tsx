import { withSx } from '@cads-ui/core';
import { Icon as Iconify, IconifyIcon } from '@iconify/react';

// -----------------------------
interface IconProps {
  icon: string | IconifyIcon;
}

// -----------------------------
const Icon = withSx<IconProps>((props) => {
  const { icon, ...other } = props;

  return <Iconify icon={icon} {...other} />;
});

export default Icon;