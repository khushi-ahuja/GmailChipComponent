import React, { Component } from 'react'
import DropdownIcon from '../icons/down-arrow.png';
import CloseImg from '../icons/close-black.png'
import "./Dropdown.css"

export default class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDropdownVisible: false,
            isSelected: "",
            searchQuery: ""
        }
    }

    hideDropdownMenu = () => { 
        if(this.state.isDropdownVisible) 
            this.setState({ isDropdownVisible: false });
    }


    render() {
        return (
            <>
                {
                    (this.state.isDropdownVisible )  && 
                    <div className='dropdown_dummy_div' onClick={() => this.setState({ isDropdownVisible: false })}></div>
                }
                <div className='dropdown_container' >
                    {
                        (this.state.isDropdownVisible && this.props.showSearch) ?
                        // search input
                        <div 
                            className={`dropdown_header`}
                            style={{ width: this.props.header_width ? this.props.header_width :''}}>
                            <div className={`flex justify-content-between align-items-center`}>
                                <input 
                                    type="text"
                                    placeholder={this.props.placeholder}
                                    className={`seachInp`}
                                    value={this.state.searchQuery}
                                    onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                    autoFocus={true}
                                />
                            </div>
                        </div> :
                        // selected value here
                        <div
                            className={`dropdown_header ${this.props.disabled ? 'not_allowed' : 'pointer'}`}
                            style={{ width: this.props.header_width ? this.props.header_width :''}}
                            onClick={() => {
                                if(!this.props.disabled) 
                                    this.setState({ isDropdownVisible: !this.state.isDropdownVisible })}
                            }
                            >
                            <div className={`flex space-between`}>
                                <div className='fontS labelGrey text_container'>
                                    {this.props.name[this.props.keyName]}
                                </div>
                                {/* <img src={DropdownIcon} /> */}
                            </div>
                        </div> 
                    }
                    <div style={{ zIndex: "1" }}>
                        {(this.state.isDropdownVisible) &&
                            <ul className='list'
                                style={{
                                    maxWidth: this.props.header_width ? this.props.header_width : `250px`,
                                    maxHeight: `${this.props.height}` ? `${this.props.height}` : 'auto' ,
                                }}
                            >
                            {this.props.list
                            .filter((elem) => {
                                if(this.state.searchQuery === ""){
                                    return elem
                                }
                                else if(elem[this.props.keyName].toLowerCase().includes(this.state.searchQuery.toLowerCase())){
                                    return elem
                                }
                            })
                            .map((item, index) => (
                                <li 
                                    className={`option`}  
                                    key={ item.email } 
                                    onClick={() => { 
                                        this.props.getDropDownValue(item, index); }
                                    }>
                                    {
                                        <div className='flex'>
                                             <div className='flex'>
                                                <div className='chipImg textCenter '>{item[this.props.keyName].substring(0,1)}</div>
                                                <div className='mx'>{item.name}</div>
                                            </div>
                                            <span className='fontS labelGrey'>{item.email}</span>
                                        </div>
                                    }
                                </li>
                            )
                            )}
                        </ul>}
                    </div>
                </div>
            </>
        )
    }
}
