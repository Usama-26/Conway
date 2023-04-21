import {CheckBox} from '../../Form';
import {useFormContext, Controller} from 'react-hook-form';

interface IRHFCheckbox {
  name: string;
}

export default function RHFCheckbox({name}: IRHFCheckbox, className: string) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <>
          <CheckBox {...field} checked={field.value} />
        </>
      )}
    />
  );
}
