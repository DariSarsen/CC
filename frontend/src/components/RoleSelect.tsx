import { Listbox } from '@headlessui/react';
import { FaCheck, FaChevronDown } from "react-icons/fa";


const roles = [
  { value: 'student', label: 'Студент' },
  { value: 'company', label: 'Компания' },
  { value: 'career_center', label: 'Центр карьеры' },
  { value: 'admin', label: 'Админ' },
]

export default function RoleSelect({ value, onChange }: {
  value: string,
  onChange: (val: string) => void
}) {
  const selectedRole = roles.find(r => r.value === value) || roles[0]

  return (
    <>
      <label className="block font-semibold text-white">Role: *</label>
      <Listbox value={selectedRole} onChange={(role) => onChange(role.value)}>
        <div className="relative">
          <Listbox.Button className="w-full p-4 text-left text-white text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out">
            {selectedRole.label}
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-2 w-full rounded-lg bg-red-900 bg-opacity-[85%] backdrop-blur-sm shadow-lg max-h-60 overflow-auto focus:outline-none text-white">
            {roles.map((role, index) => (
              <Listbox.Option
                key={role.value}
                value={role}
                className={({ active }) =>
                  `cursor-pointer select-none p-4 
                  ${active ? 'bg-red-700 bg-opacity-30' : ''}
                  ${index !== roles.length - 1 ? 'border-b-2 border-red-800' : ''}`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{role.label}</span>
                    {selected && <FaCheck className="w-4 h-4 text-white" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>

        </div>
      </Listbox>
    </>
  )
}
