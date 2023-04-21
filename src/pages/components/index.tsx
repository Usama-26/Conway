import { CheckBox, TextArea, TextInput } from '@/components/Form'
import FileInput from '@/components/Form/FileInput';
import SelectInput from '@/components/Form/SelectInput'
import React from 'react'

const Index = () => {
  const options: any[] = [
    { label: 'Test1', value: '1' },
    { label: 'Test2', value: '2' },
    { label: 'Test3', value: '3' },
    { label: 'Test4', value: '4' },
    { label: 'Test5', value: '5' },
  ];
  return (
    <div className='p-4'>
      <div className='row'>
        <div className="col-md-4">
          <label className="form-label">First name</label>
          <TextInput name="dd"
            placeholder="Search"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Description</label>
          <TextArea name="description"
            placeholder="Description"
          />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-4">
          <label className="form-label">Select</label>
          <SelectInput options={options} />
        </div>
        <div className="col-md-4">
          <div className='mt-4'>
            <label className="form-label">CheckBox</label>
            <CheckBox className='mx-2' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index