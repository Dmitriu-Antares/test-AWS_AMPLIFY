/* eslint-disable no-use-before-define */
import React, {useEffect} from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components';

const InputWrapper = styled('div')`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`

const Tag = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
      <Typography variant="body2">{label}</Typography>
      <CloseIcon onClick={onDelete} />
    </div>
  ))`
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: #40a9ff;
      background-color: #e6f7ff;
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
`

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`

export default function InputAutocomplete(props) {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        defaultValue: props.defaultValue,
        multiple: true,
        options: props.data,
        getOptionLabel: (option: string) => option,
    });

    const { returnValue, currentData } = props

    
    useEffect(() => {
        if(JSON.stringify(currentData)!=JSON.stringify(value)){
            returnValue(value)
        }
    }, [value])

    return (
        <NoSsr>
        <div>
            <div {...getRootProps()}>
            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                {value.map((option, index) => (
                    <Tag label={option} {...getTagProps({ index })} />
                ))}
                <input {...getInputProps()} />
            </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
                {groupedOptions.map((option: string, index: number) => (
                    <li {...getOptionProps({ option, index })}>
                        <Typography variant="body2">{option}</Typography>
                        <CheckIcon fontSize="small" />
                    </li>
                ))}
            </Listbox>
            ) : null}
        </div>
        </NoSsr>
  );
}
