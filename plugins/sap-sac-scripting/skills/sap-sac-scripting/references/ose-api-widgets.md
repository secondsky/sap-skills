---
version: "2025.14"
sac_release: "Q1 2026 (2026.2)"
full_api_docs: "https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html"
last_verified: "2026-03-07"
---

# OSE API: UI Widgets

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Interactive UI widget classes: buttons, dropdowns, input fields, sliders, text areas, shapes, and media widgets.

## Classes in This File

- [Button](#button)
- [Dropdown](#dropdown)
- [Image](#image)
- [InputField](#inputfield)
- [ListBox](#listbox)
- [RadioButtonGroup](#radiobuttongroup)
- [RangeSlider](#rangeslider)
- [Shape](#shape)
- [Slider](#slider)
- [Switch](#switch)
- [Text](#text)
- [TextArea](#textarea)
- [TextAreaStyle](#textareastyle)
- [TextPool](#textpool)
- [WebPage](#webpage)

---

<a name="button"></a>

Button

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Last Update

2024.18

Method Summary

|     |
| --- |
| Name and Description |
| [getText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_MgetText)(): string<br>Returns the text of the button. |
| [getTooltip](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_MgetTooltip)(): string<br>Returns the tooltip text of the button. |
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_MisEnabled)(): boolean<br>Returns whether the button is enabled. |
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_MsetEnabled)(value: boolean): void<br>Enables or disables the button. |
| [setText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_MsetText)(value: string): void<br>Sets the text of the button. |
| [setTooltip](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_MsetTooltip)(value: string): void<br>Sets the tooltip text of the button. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onClick](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_EonClick)(): void<br>Called when the user clicks the button. |
| [onLongPress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button_EonLongPress)(): void<br>Called when the user presses and holds the button. |

Method Detail

|     |
| --- |
| getText |
| getText(): string<br>Returns the text of the button. If no text is present, then undefined is returned.<br>Returns<br>string |

|     |
| --- |
| getTooltip |
| getTooltip(): string<br>Returns the tooltip text of the button. If no tooltip text is present, then undefined is returned.<br>Returns<br>string |

|     |
| --- |
| isEnabled |
| isEnabled(): boolean<br>Returns whether the button is enabled.<br>Returns<br>boolean<br>Since<br>2024.18 |

|     |     |     |
| --- | --- | --- |
| setEnabled |
| setEnabled(value: boolean): void

Enables or disables the button.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | boolean |  |

Since

2024.18 |

|     |     |     |
| --- | --- | --- |
| setText |
| setText(value: string): void

Sets the text of the button.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | string |  |

|     |     |     |
| --- | --- | --- |
| setTooltip |
| setTooltip(value: string): void

Sets the tooltip text of the button.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | string |  |

Event Detail

|     |
| --- |
| onClick |
| onClick(): void<br>Called when the user clicks the button. |

|     |
| --- |
| onLongPress |
| onLongPress(): void<br>Called when the user presses and holds the button. Only supported for mobile devices.<br>Since<br>2020.13 |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="dropdown"></a>

Dropdown

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Method Summary

|     |
| --- |
| Name and Description |
| [addItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_MaddItem)(key: string, text?: string): void<br>Adds a new item to the dropdown. |
| [getSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_MgetSelectedKey)(): string<br>Returns the key of the selected item in the dropdown. |
| [getSelectedText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_MgetSelectedText)(): string<br>Returns the text of the selected item in the dropdown. |
| [removeAllItems](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_MremoveAllItems)(): void<br>Removes all items from the dropdown. |
| [removeItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_MremoveItem)(key: string): void<br>Removes an item from the dropdown. |
| [setSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_MsetSelectedKey)(key: string): void<br>Selects an item in the dropdown. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown_EonSelect)(): void<br>Called when the user selects an item in the dropdown. |

Method Detail

|     |     |     |
| --- | --- | --- |
| addItem |
| addItem(key: string, text?: string): void

Adds a new item to the dropdown. The item is specified by a key and an optional text. If the key or the text already exists, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  |
| textOptional: | string |  | |

|     |
| --- |
| getSelectedKey |
| getSelectedKey(): string<br>Returns the key of the selected item in the dropdown. If no item is selected, then undefined is returned.<br>Returns<br>string |

|     |
| --- |
| getSelectedText |
| getSelectedText(): string<br>Returns the text of the selected item in the dropdown. If no item is selected, then undefined is returned.<br>Returns<br>string |

|     |
| --- |
| removeAllItems |
| removeAllItems(): void<br>Removes all items from the dropdown. |

|     |     |     |
| --- | --- | --- |
| removeItem |
| removeItem(key: string): void

Removes an item from the dropdown. The item is specified by its key. If the key isn't present, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  | |

|     |     |     |
| --- | --- | --- |
| setSelectedKey |
| setSelectedKey(key: string): void

Selects an item in the dropdown. The item is specified by its key. If the key isn't present, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  | |

Event Detail

|     |
| --- |
| onSelect |
| onSelect(): void<br>Called when the user selects an item in the dropdown. |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C

Event

Since

2023.19

Type Library
[exportcsv](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportcsv)

C



---

<a name="image"></a>

Image

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Last Update

2020.13

Method Summary

|     |
| --- |
| Name and Description |
| [setHyperlink](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Image_MsetHyperlink)(type: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType), value?: string): void<br>Sets the hyperlink that the image will navigate to when clicked. |
| [setImage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Image_MsetImage)(url: string): void<br>Sets the URL of the image. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onClick](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Image_EonClick)(): void<br>Called when the user clicks the image. |
| [onLongPress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Image_EonLongPress)(): void<br>Called when the user presses and holds the image. |

Method Detail

|     |     |     |
| --- | --- | --- |
| setHyperlink |
| setHyperlink(type: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType), value?: string): void

Sets the hyperlink that the image will navigate to when clicked.

Parameters

|     |     |     |
| --- | --- | --- |
| type: | [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType) |  |
| valueOptional: | string |  | |

|     |     |     |
| --- | --- | --- |
| setImage |
| setImage(url: string): void

Sets the URL of the image.

Parameters

|     |     |     |
| --- | --- | --- |
| url: | string |  |

Since

2019.10 |

Event Detail

|     |
| --- |
| onClick |
| onClick(): void<br>Called when the user clicks the image. |

|     |
| --- |
| onLongPress |
| onLongPress(): void<br>Called when the user presses and holds the image. Only supported for mobile devices.<br>Since<br>2020.13 |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="inputfield"></a>

InputField

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2019.3

Last Update

2020.9

Method Summary

|     |
| --- |
| Name and Description |
| [getValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MgetValue)(): string<br>Returns the value of the input field. |
| [isEditable](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MisEditable)(): boolean<br>Returns whether the input field is editable. |
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MisEnabled)(): boolean<br>Returns whether the input field is enabled. |
| [setEditable](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MsetEditable)(editable: boolean): void<br>Enables or disables editing of the input field. |
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MsetEnabled)(enabled: boolean): void<br>Enables or disables the input field. |
| [setStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MsetStyle)(style: [InputFieldStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputFieldStyle) JSON): void<br>Applies the style to the input field. |
| [setValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_MsetValue)(value: string): void<br>Sets the value of the input field. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField_EonChange)(): void<br>Called when the input field doesn't have the focus anymore, for example, after the user has entered text and pressed the "Enter" key. |

Method Detail

|     |
| --- |
| getValue |
| getValue(): string<br>Returns the value of the input field.<br>Returns<br>string |

|     |
| --- |
| isEditable |
| isEditable(): boolean<br>Returns whether the input field is editable.<br>Returns<br>boolean |

|     |
| --- |
| isEnabled |
| isEnabled(): boolean<br>Returns whether the input field is enabled.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| setEditable |
| setEditable(editable: boolean): void

Enables or disables editing of the input field.

Parameters

|     |     |     |
| --- | --- | --- |
| editable: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setEnabled |
| setEnabled(enabled: boolean): void

Enables or disables the input field.

Parameters

|     |     |     |
| --- | --- | --- |
| enabled: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setStyle |
| setStyle(style: [InputFieldStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputFieldStyle) JSON): void

Applies the style to the input field. You can also pass a JSON object for the style argument. In the script editor, type "{}", place the cursor between the curly brackets, then press Ctrl+Space to list the available properties.

Parameters

|     |     |     |
| --- | --- | --- |
| style: | [InputFieldStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputFieldStyle) JSON |  |

Since

2020.9 |

|     |     |     |
| --- | --- | --- |
| setValue |
| setValue(value: string): void

Sets the value of the input field.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | string |  |

Event Detail

|     |
| --- |
| onChange |
| onChange(): void<br>Called when the input field doesn't have the focus anymore, for example, after the user has entered text and pressed the "Enter" key. |

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="listbox"></a>

ListBox

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2020.14

Method Summary

|     |
| --- |
| Name and Description |
| [addItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MaddItem)(key: string, text?: string): void<br>Adds a new item to the list box. |
| [getSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MgetSelectedKey)(): string<br>Returns the key of the selected item in the list box. |
| [getSelectedKeys](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MgetSelectedKeys)(): string\[\]<br>Returns the keys of the selected items in the list box. |
| [getSelectedText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MgetSelectedText)(): string<br>Returns the text of the selected item in the list box. |
| [getSelectedTexts](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MgetSelectedTexts)(): string\[\]<br>Returns the texts of the selected items in the list box. |
| [removeAllItems](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MremoveAllItems)(): void<br>Removes all items from the list box. |
| [removeItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MremoveItem)(key: string): void<br>Removes an item from the list box. |
| [setSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MsetSelectedKey)(key: string): void<br>Selects an item in the list box. |
| [setSelectedKeys](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_MsetSelectedKeys)(keys: string\[\]): void<br>Selects items in the list box. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox_EonSelect)(): void<br>Called when the user selects an item in the list box. |

Method Detail

|     |     |     |
| --- | --- | --- |
| addItem |
| addItem(key: string, text?: string): void

Adds a new item to the list box. The item is specified by a key and an optional text. If the key or the text already exists, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  |
| textOptional: | string |  | |

|     |
| --- |
| getSelectedKey |
| getSelectedKey(): string<br>Returns the key of the selected item in the list box. If the list box allows multiple selections, then the key of the first selected item is returned. If no item is selected, then undefined is returned.<br>Returns<br>string |

|     |
| --- |
| getSelectedKeys |
| getSelectedKeys(): string\[\]<br>Returns the keys of the selected items in the list box. If no items are selected, then an empty array is returned.<br>Returns<br>string\[\] |

|     |
| --- |
| getSelectedText |
| getSelectedText(): string<br>Returns the text of the selected item in the list box. If the list box allows multiple selections, then the text of the first selected item is returned. If no item is selected, then undefined is returned.<br>Returns<br>string |

|     |
| --- |
| getSelectedTexts |
| getSelectedTexts(): string\[\]<br>Returns the texts of the selected items in the list box. If no items are selected, then an empty array is returned.<br>Returns<br>string\[\] |

|     |
| --- |
| removeAllItems |
| removeAllItems(): void<br>Removes all items from the list box. |

|     |     |     |
| --- | --- | --- |
| removeItem |
| removeItem(key: string): void

Removes an item from the list box. The item is specified by its key. If the key isn't present, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  | |

|     |     |     |
| --- | --- | --- |
| setSelectedKey |
| setSelectedKey(key: string): void

Selects an item in the list box. The item is specified by its key. If the key isn't present in the list box, then nothing is selected.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  | |

|     |     |     |
| --- | --- | --- |
| setSelectedKeys |
| setSelectedKeys(keys: string\[\]): void

Selects items in the list box. The items are specified by their keys. If the list box allows only a single selection, then the first of the specified keys is selected that is present in the list box. If the keys aren't present in the list box, then nothing is selected.

Parameters

|     |     |     |
| --- | --- | --- |
| keys: | string\[\] |  | |

Event Detail

|     |
| --- |
| onSelect |
| onSelect(): void<br>Called when the user selects an item in the list box. |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

---

<a name="radiobuttongroup"></a>

RadioButtonGroup\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [addItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_MaddItem)(key: string, text?: string): void<br>Adds a new item to the radio button group. |\
| [getSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_MgetSelectedKey)(): string<br>Returns the key of the selected item in the radio button group. |\
| [getSelectedText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_MgetSelectedText)(): string<br>Returns the text of the selected item in the radio button group. |\
| [removeAllItems](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_MremoveAllItems)(): void<br>Removes all items from the radio button group. |\
| [removeItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_MremoveItem)(key: string): void<br>Removes the item from the radio button group. |\
| [setSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_MsetSelectedKey)(key: string): void<br>Selects an item in the radio button group. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup_EonSelect)(): void<br>Called when the user changes the selection in the radio button group. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| addItem |\
| addItem(key: string, text?: string): void\
\
Adds a new item to the radio button group. The item is specified by a key and an optional text. If the key or the text already exists, then this operation is ignored.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
| textOptional: | string |  | |\
\
|     |\
| --- |\
| getSelectedKey |\
| getSelectedKey(): string<br>Returns the key of the selected item in the radio button group. If no item is selected, then undefined is returned.<br>Returns<br>string |\
\
|     |\
| --- |\
| getSelectedText |\
| getSelectedText(): string<br>Returns the text of the selected item in the radio button group. If no item is selected, then undefined is returned.<br>Returns<br>string |\
\
|     |\
| --- |\
| removeAllItems |\
| removeAllItems(): void<br>Removes all items from the radio button group. |\
\
|     |     |     |\
| --- | --- | --- |\
| removeItem |\
| removeItem(key: string): void\
\
Removes the item from the radio button group. The item is specified by its key. If the key isn't present, then this operation is ignored.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setSelectedKey |\
| setSelectedKey(key: string): void\
\
Selects an item in the radio button group. The item is specified by its key. If the key isn't present, then this operation is ignored.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  | |\
\
Event Detail\
\
|     |\
| --- |\
| onSelect |\
| onSelect(): void<br>Called when the user changes the selection in the radio button group. |\
\
Type Library\
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)\
\
C\
\


---

<a name="rangeslider"></a>

RangeSlider\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2019.7\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getMaxValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_MgetMaxValue)(): number<br>Returns the maximum value of the range slider. |\
| [getMinValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_MgetMinValue)(): number<br>Returns the minimum value of the range slider. |\
| [getRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_MgetRange)(): [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range)<br>Returns the range of the range slider. |\
| [setMaxValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_MsetMaxValue)(value: number): void<br>Sets the maximum value of the range slider. |\
| [setMinValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_MsetMinValue)(value: number): void<br>Sets the minimum value of the range slider. |\
| [setRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_MsetRange)(range: [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range)): void<br>Sets the range of the range slider. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider_EonChange)(): void<br>Called when the range slider doesn't have the focus anymore. |\
\
Method Detail\
\
|     |\
| --- |\
| getMaxValue |\
| getMaxValue(): number<br>Returns the maximum value of the range slider.<br>Returns<br>number |\
\
|     |\
| --- |\
| getMinValue |\
| getMinValue(): number<br>Returns the minimum value of the range slider.<br>Returns<br>number |\
\
|     |\
| --- |\
| getRange |\
| getRange(): [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range)<br>Returns the range of the range slider.<br>Returns<br>[Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range) |\
\
|     |     |     |\
| --- | --- | --- |\
| setMaxValue |\
| setMaxValue(value: number): void\
\
Sets the maximum value of the range slider.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setMinValue |\
| setMinValue(value: number): void\
\
Sets the minimum value of the range slider.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setRange |\
| setRange(range: [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range)): void\
\
Sets the range of the range slider.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| range: | [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range) |  | |\
\
Event Detail\
\
|     |\
| --- |\
| onChange |\
| onChange(): void<br>Called when the range slider doesn't have the focus anymore. |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="shape"></a>

Shape\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Last Update\
\
2020.13\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [setHyperlink](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Shape_MsetHyperlink)(type: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType), value?: string): void<br>Sets the hyperlink that the shape will navigate to. |\
| [setStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Shape_MsetStyle)(style: [ShapeStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ShapeStyle) JSON): void<br>Applies the style to the shape. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onClick](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Shape_EonClick)(): void<br>Called when the user clicks the shape. |\
| [onLongPress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Shape_EonLongPress)(): void<br>Called when the user presses and holds the shape. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| setHyperlink |\
| setHyperlink(type: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType), value?: string): void\
\
Sets the hyperlink that the shape will navigate to.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| type: | [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType) |  |\
| valueOptional: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setStyle |\
| setStyle(style: [ShapeStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ShapeStyle) JSON): void\
\
Applies the style to the shape. You can also pass a JSON object for this argument. In the script editor, type "{}", place the cursor between the curly brackets, then press Ctrl+Space to list the available properties.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| style: | [ShapeStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ShapeStyle) JSON |  |\
\
Since\
\
2020.9 |\
\
Event Detail\
\
|     |\
| --- |\
| onClick |\
| onClick(): void<br>Called when the user clicks the shape. |\
\
|     |\
| --- |\
| onLongPress |\
| onLongPress(): void<br>Called when the user presses and holds the shape. Only supported for mobile devices.<br>Since<br>2020.13 |\
\
Type Library\
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)\
\
C\
\


---

<a name="slider"></a>

Slider\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2019.7\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getMaxValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_MgetMaxValue)(): number<br>Returns the maximum value of the slider. |\
| [getMinValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_MgetMinValue)(): number<br>Returns the minimum value of the slider. |\
| [getValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_MgetValue)(): number<br>Returns the value of the slider. |\
| [setMaxValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_MsetMaxValue)(value: number): void<br>Sets the maximum value of the slider. |\
| [setMinValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_MsetMinValue)(value: number): void<br>Sets the minimum value of the slider. |\
| [setValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_MsetValue)(value: number): void<br>Sets the value of the slider. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider_EonChange)(): void<br>Called when the slider doesn't have the focus anymore. |\
\
Method Detail\
\
|     |\
| --- |\
| getMaxValue |\
| getMaxValue(): number<br>Returns the maximum value of the slider.<br>Returns<br>number |\
\
|     |\
| --- |\
| getMinValue |\
| getMinValue(): number<br>Returns the minimum value of the slider.<br>Returns<br>number |\
\
|     |\
| --- |\
| getValue |\
| getValue(): number<br>Returns the value of the slider.<br>Returns<br>number |\
\
|     |     |     |\
| --- | --- | --- |\
| setMaxValue |\
| setMaxValue(value: number): void\
\
Sets the maximum value of the slider.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setMinValue |\
| setMinValue(value: number): void\
\
Sets the minimum value of the slider.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setValue |\
| setValue(value: number): void\
\
Sets the value of the slider.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
Event Detail\
\
|     |\
| --- |\
| onChange |\
| onChange(): void<br>Called when the slider doesn't have the focus anymore. |\
\
Type Library\
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)\
\
C\
\


---

<a name="switch"></a>

Switch\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2020.15\
\
Last Update\
\
2020.16\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Switch_MisEnabled)(): boolean<br>Returns whether the switch is enabled. |\
| [isOn](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Switch_MisOn)(): boolean<br>Returns whether the switch is turned on. |\
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Switch_MsetEnabled)(enabled: boolean): void<br>Enables or disables the switch. |\
| [setOn](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Switch_MsetOn)(on: boolean): void<br>Turns the switch on or off. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Switch_EonChange)(): void<br>Called when the switch has been turned on or off. |\
\
Method Detail\
\
|     |\
| --- |\
| isEnabled |\
| isEnabled(): boolean<br>Returns whether the switch is enabled.<br>Returns<br>boolean |\
\
|     |\
| --- |\
| isOn |\
| isOn(): boolean<br>Returns whether the switch is turned on.<br>Returns<br>boolean<br>Since<br>2020.16 |\
\
|     |     |     |\
| --- | --- | --- |\
| setEnabled |\
| setEnabled(enabled: boolean): void\
\
Enables or disables the switch.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| enabled: | boolean |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setOn |\
| setOn(on: boolean): void\
\
Turns the switch on or off.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| on: | boolean |  |\
\
Since\
\
2020.16 |\
\
Event Detail\
\
|     |\
| --- |\
| onChange |\
| onChange(): void<br>Called when the switch has been turned on or off.<br>Since<br>2020.16 |\
\
Type Library\
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)\
\
---

<a name="text"></a>

Text\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Last Update\
\
2020.9\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [applyText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Text_MapplyText)(text: string): void<br>Replaces the text of the first formatted section of the Text widget. |\
| [getPlainText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Text_MgetPlainText)(): string<br>Returns the text of the Text widget, with no formatting or markup information. |\
| [setStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Text_MsetStyle)(textStyle: [TextStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextStyle) JSON): void<br>Applies the style to the text. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onClick](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Text_EonClick)(): void<br>Called when the user clicks the text. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| applyText |\
| applyText(text: string): void\
\
Replaces the text of the first formatted section of the Text widget. If multiple text styles are present within the contents, then only the text with the first configured style is replaced. If only one text style is present, then the entire text is replaced.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| text: | string |  | |\
\
|     |\
| --- |\
| getPlainText |\
| getPlainText(): string<br>Returns the text of the Text widget, with no formatting or markup information.<br>Returns<br>string |\
\
|     |     |     |\
| --- | --- | --- |\
| setStyle |\
| setStyle(textStyle: [TextStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextStyle) JSON): void\
\
Applies the style to the text. You can also pass a JSON object for this argument. In the script editor, type "{}", place the cursor between the curly brackets, then press Ctrl+Space to list the available properties.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| textStyle: | [TextStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextStyle) JSON |  |\
\
Since\
\
2020.9 |\
\
Event Detail\
\
|     |\
| --- |\
| onClick |\
| onClick(): void<br>Called when the user clicks the text.<br>Since<br>2019.10 |\
\
Type Library\
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)\
\
C\
\


---

<a name="textarea"></a>

TextArea\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2019.23\
\
Last Update\
\
2020.9\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MgetValue)(): string<br>Returns the value of the text area. |\
| [isEditable](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MisEditable)(): boolean<br>Returns whether the text area is editable. |\
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MisEnabled)(): boolean<br>Returns whether the text area is enabled. |\
| [setEditable](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MsetEditable)(editable: boolean): void<br>Enables or disables editing of the text area. |\
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MsetEnabled)(enabled: boolean): void<br>Enables or disables the text area. |\
| [setStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MsetStyle)(style: [TextAreaStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextAreaStyle) JSON): void<br>Applies the style to the text area. |\
| [setValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_MsetValue)(value: string): void<br>Sets the value of the text area. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea_EonChange)(): void<br>Called when the text area doesn't have the focus anymore, for example, after the user has entered text and pressed the "Enter" key. |\
\
Method Detail\
\
|     |\
| --- |\
| getValue |\
| getValue(): string<br>Returns the value of the text area.<br>Returns<br>string |\
\
|     |\
| --- |\
| isEditable |\
| isEditable(): boolean<br>Returns whether the text area is editable.<br>Returns<br>boolean |\
\
|     |\
| --- |\
| isEnabled |\
| isEnabled(): boolean<br>Returns whether the text area is enabled.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| setEditable |\
| setEditable(editable: boolean): void\
\
Enables or disables editing of the text area.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| editable: | boolean |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setEnabled |\
| setEnabled(enabled: boolean): void\
\
Enables or disables the text area.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| enabled: | boolean |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setStyle |\
| setStyle(style: [TextAreaStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextAreaStyle) JSON): void\
\
Applies the style to the text area. You can also pass a JSON object for this argument. In the script editor, type "{}", place the cursor between the curly brackets, then press Ctrl+Space to list the available properties.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| style: | [TextAreaStyle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextAreaStyle) JSON |  |\
\
Since\
\
2020.9 |\
\
|     |     |     |\
| --- | --- | --- |\
| setValue |\
| setValue(value: string): void\
\
Sets the value of the text area.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | string |  |\
\
Event Detail\
\
|     |\
| --- |\
| onChange |\
| onChange(): void<br>Called when the text area doesn't have the focus anymore, for example, after the user has entered text and pressed the "Enter" key. |\
\
Type Library\
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)\
\
C\
\


---

<a name="textareastyle"></a>

TextAreaStyle\
\
can be passed as a JSON object to method arguments\
\
Since\
\
2020.9\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [backgroundColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextAreaStyle_PbackgroundColor): string<br>Background color of the text area |\
| [borderColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextAreaStyle_PborderColor): string<br>Border color of the text area |\
| [color](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextAreaStyle_Pcolor): string<br>Font color of the text area |\
\
Property Detail\
\
|     |\
| --- |\
| backgroundColor |\
| backgroundColor: string<br>Background color of the text area |\
\
|     |\
| --- |\
| borderColor |\
| borderColor: string<br>Border color of the text area |\
\
|     |\
| --- |\
| color |\
| color: string<br>Font color of the text area |\
\
Type Library\
[textpool](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtextpool)\
\
C\
\


---

<a name="textpool"></a>

TextPool\
\
Since\
\
2023.25\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextPool_MgetText)(textId: string): string<br> fetch the string corresponding to the textId. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| getText |\
| getText(textId: string): string\
\
fetch the string corresponding to the textId.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| textId: | string |  |\
\
Returns\
\
string |\
\
Type Library\
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)\
\
C\
\


---

<a name="webpage"></a>

WebPage\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Last Update\
\
2018.22\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [postMessage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WebPage_MpostMessage)(message: string, targetOrigin?: string): void<br>Posts a message to a web page. |\
| [setAddress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WebPage_MsetAddress)(address: string): void<br>Sets the address that the web page will navigate to. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| postMessage |\
| postMessage(message: string, targetOrigin?: string): void\
\
Posts a message to a web page.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| message: | string |  |\
| targetOriginOptional: | string |  |\
\
Since\
\
2018.22 |\
\
|     |     |     |\
| --- | --- | --- |\
| setAddress |\
| setAddress(address: string): void\
\
Sets the address that the web page will navigate to.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| address: | string |  | |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
C\
\


---

