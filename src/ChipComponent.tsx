import React, { useState } from 'react';
import CustomDropdown from './Dropdown/Dropdown.tsx';

interface Chip {
  name: string;
  email: string;
}

interface ChipData {
  selChipList: Chip[];
  dataList: Chip[];
}

function ChipComponent(): JSX.Element {
    const [chipData, setChipData] = useState({
        selChipList : [
           
        ],
        dataList: [
            {
                name: "khushi",
                email: "testuser1@example.com",
            },
            {
                name: "user 2",
                email: "testuser2@example.com",
            }, {
                name: "soham",
                email: "testuser3@example.com",
            }, {
                name: "kartik",
                email: "testuser4@example.com",
            }, {
                name: "akshat",
                email: "testuser5@example.com",
            }, {
                name: "umang",
                email: "testuser6@example.com",
            }, {
                name: "kashish",
                email:"dummyemail@example.com",
            }, {
                name: "etisha",
                email:"dummyemail3@example.com",
            }, {
                name: "dan",
                email:"dummyemail10@example.com",
            },
        ]
    })

  // deep copy of obj / array
  function deepCopyObject<T>(obj: T): T {
    let deepCopiedObj: T = JSON.parse(JSON.stringify(obj));
    return deepCopiedObj;
  }

  // handle add from the list
  const handleAdd = (elem: Chip, index: number): void => {
    let localChipData = deepCopyObject(chipData);
    localChipData.selChipList.push(elem);
    localChipData.dataList.splice(index, 1);
    setChipData(localChipData);
  };

  // handle delete from selected list
  const handleRemoveChip = (elem: Chip, index: number): void => {
    let localChipData = deepCopyObject(chipData);
    localChipData.dataList.push(elem);
    localChipData.selChipList.splice(index, 1);
    setChipData(localChipData);
  };

  return (
    <div className='flex mainInputContainer'>
      {/* selected chip list here */}
      {chipData.selChipList.map((chip: Chip, index) => (
        <div className='flex space-between chip mx' key={chip.email}>
          <div className='flex'>
            <div className='chipImg textCenter '>{chip.name.substring(0, 1)}</div>
            <div className='mx'>{chip.name}</div>
          </div>
          <div className='mx' onClick={() => handleRemoveChip(chip, index)}>
            X
          </div>
        </div>
      ))}
      {/* input for more */}
      <CustomDropdown
        showSearch={true}
        header_width={'350px'}
        height={'10rem'}
        keyName={'name'}
        list={chipData.dataList}
        name={{ name: 'Add New User ... ' }}
        placeholder={'Add New User ... '}
        getDropDownValue={(selUser, index) => handleAdd(selUser, index)}
      />
    </div>
  );
}

export default ChipComponent;
