import AlertView from '../../atoms/AlertView/AlertView';
import { useAlertProps } from '../../hooks';

export default function AlertGroup() {
  const { items } = useAlertProps();
  return <AlertView items={items} />;
}
