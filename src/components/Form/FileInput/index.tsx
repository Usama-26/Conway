import React, {ForwardedRef, useState} from 'react';

interface IFileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: any;
  error?: {
    message?: string;
  };
  onFileSelect?: (files: FileList) => void;
}

const FileInput = React.forwardRef(
  (
    {name, variant, type, error, onFileSelect, ...otherProps}: IFileInputProps,
    ref: ForwardedRef<any>
  ) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const onfileChange = (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (target && target?.files && target?.files?.length > 0) {
        setFileName(target.files[0]['name']);
        onFileSelect && onFileSelect(target.files);
      }
    };
    return (
      <>
        <div ref={ref} className={'relative'}>
          <div className="p-4">
            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  <label className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer focus:outline-none focus:underline transition duration-150 ease-in-out">
                    {fileName || 'Upload a file'}
                    <input
                      type="file"
                      onChange={onfileChange}
                      name={name}
                      id={name}
                      className="hidden"
                    />
                  </label>
                  {/* or drag and drop */}
                </p>
                {/* <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p> */}
              </div>
            </div>
          </div>
        </div>
        {error && (
          <p
            className={`text-sm mt-1.5 ${
              error ? 'text-error-500' : 'text-gray-600'
            }`}
          >
            {error.message}
          </p>
        )}
      </>
    );
  }
);
export default FileInput;
