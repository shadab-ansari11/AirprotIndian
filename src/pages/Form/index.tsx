import React from 'react'
import * as Styled from '../Form/form.Styled'

interface Forminputprops {
  labletext: string;
  placeholder: string;
  typetext: string;
  searchResult: ISearchResult[];
  onSelected?: (value: string) => void;
  onChange: (value: string) => void;
  value?: any;

}

interface ISearchResult {
  name: string;
}

export default function Forminput(props: Forminputprops) {
  const { labletext, typetext, placeholder, onSelected, onChange, value, searchResult } = props;
  console.log("searchResult",searchResult)
  return (
    <Styled.LabelContainer>
      <Styled.LabelTag>{labletext}</Styled.LabelTag>
      <Styled.InputField
        type={typetext}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        value={value?.city_name} />

      <Styled.DropdownContainer>
        {value && value?.length > 2 && searchResult.map((item: any) => {
          return (
            <Styled.Dropdown onClick={() => onSelected && onSelected(item)}>
              {item.city_name}
            </Styled.Dropdown>

          )
        })

        }
      </Styled.DropdownContainer>


    </Styled.LabelContainer>
  )
}
