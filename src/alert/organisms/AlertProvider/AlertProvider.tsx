import AlertView from '../../atoms/AlertView/AlertView';
import { useAlertProps } from '../../hooks';

export default function AlertProvider() {
  const { items } = useAlertProps();
  return <AlertView items={items} />;
}
