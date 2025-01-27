import AlertTemplate from '../../atoms/AlertTemplate/AlertTemplate';
import { useAlertProps } from '../../hooks';

export default function AlertGroup() {
  const { items } = useAlertProps();
  return <AlertTemplate items={items} />;
}
