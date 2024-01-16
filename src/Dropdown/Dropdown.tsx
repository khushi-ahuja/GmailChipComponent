import React, { useState, ChangeEvent } from 'react';
import DropdownIcon from '../icons/down-arrow.png';
import CloseImg from '../icons/close-black.png';
import "./Dropdown.css";

interface DropdownProps {
  showSearch: boolean;
  header_width?: string;
  height?: string;
  disabled?: boolean;
  placeholder: string;
  name: { [key: string]: string };
  keyName: string;
  list: { [key: string]: string }[];
  getDropDownValue: (item: { [key: string]: string }, index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const hideDropdownMenu = () => {
    if (isDropdownVisible) setDropdownVisible(false);
  };

  return (
    <>
      {isDropdownVisible && (
        <div className='dropdown_dummy_div' onClick={() => setDropdownVisible(false)}></div>
      )}
      <div className='dropdown_container'>
        {isDropdownVisible && props.showSearch ? (
          // search input
          <div className={`dropdown_header`} style={{ width: props.header_width ? props.header_width : '' }}>
            <div className={`flex justify-content-between align-items-center`}>
              <input
                type="text"
                placeholder={props.placeholder}
                className={`seachInp`}
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                autoFocus={true}
              />
            </div>
          </div>
        ) : (
          // selected value here
          <div
            className={`dropdown_header ${props.disabled ? 'not_allowed' : 'pointer'}`}
            style={{ width: props.header_width ? props.header_width : '' }}
            onClick={() => {
              if (!props.disabled) setDropdownVisible(!isDropdownVisible);
            }}
          >
            <div className={`flex space-between`}>
              <div className='fontS labelGrey text_container'>{props.name[props.keyName]}</div>
              {/* <img src={DropdownIcon} /> */}
            </div>
          </div>
        )}
        <div style={{ zIndex: "1" }}>
          {isDropdownVisible && (
            <ul
              className='list'
              style={{
                maxWidth: props.header_width ? props.header_width : `250px`,
                maxHeight: `${props.height}` ? `${props.height}` : 'auto',
              }}
            >
              {props.list
                .filter((elem) => {
                  if (searchQuery === "") {
                    return elem;
                  } else if (elem[props.keyName].toLowerCase().includes(searchQuery.toLowerCase())) {
                    return elem;
                  }
                })
                .map((item, index) => (
                  <li
                    className={`option`}
                    key={item.email}
                    onClick={() => {
                      props.getDropDownValue(item, index);
                    }}
                  >
                    {
                      <div className='flex'>
                        <div className='flex'>
                          <div className='chipImg textCenter '>{item[props.keyName].substring(0, 1)}</div>
                          <div className='mx'>{item.name}</div>
                        </div>
                        <span className='fontS labelGrey'>{item.email}</span>
                      </div>
                    }
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
