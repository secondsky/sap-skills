# XML and JSON Processing - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/21_XML_JSON.md

---

## XML Processing Libraries

### iXML (DOM-Based)

Higher memory, full DOM tree in memory.

**Creating XML:**

```abap
DATA(ixml) = cl_ixml_core=>create( ).
DATA(document) = ixml->create_document( ).

" Create root element
DATA(root) = document->create_element_ns( name = 'root' prefix = 'ns' ).
document->append_child( root ).

" Create child elements
DATA(child) = document->create_element( 'item' ).
child->set_value( 'value' ).
root->append_child( child ).

" Render to xstring
DATA xml TYPE xstring.
ixml->create_renderer(
  document = document
  ostream = ixml->create_stream_factory( )->create_ostream_xstring( string = xml )
)->render( ).
```

**Parsing XML:**

```abap
DATA(ixml) = cl_ixml_core=>create( ).
DATA(document) = ixml->create_document( ).
DATA(parser) = ixml->create_parser(
  istream = ixml->create_stream_factory( )->create_istream_xstring( string = xml )
  document = document
  stream_factory = ixml->create_stream_factory( ) ).

IF parser->parse( ) = 0.
  DATA(root) = document->get_root_element( ).
  DATA(child) = root->get_first_child( ).
ENDIF.
```

### sXML (Token-Based)

More memory-efficient, sequential processing.

**Creating XML:**

```abap
DATA(writer) = CAST if_sxml_writer(
  cl_sxml_string_writer=>create( type = if_sxml=>co_xt_xml10 ) ).

TRY.
    writer->open_element( name = 'root' ).
    writer->open_element( name = 'item' ).
    writer->write_value( 'value' ).
    writer->close_element( ).
    writer->close_element( ).
  CATCH cx_sxml_state_error.
ENDTRY.

DATA(xml) = CAST cl_sxml_string_writer( writer )->get_output( ).
```

**Parsing XML:**

```abap
DATA(reader) = cl_sxml_string_reader=>create( xml ).

TRY.
    DO.
      reader->next_node( ).
      IF reader->node_type = if_sxml_node=>co_nt_final.
        EXIT.
      ENDIF.

      CASE reader->node_type.
        WHEN if_sxml_node=>co_nt_element_open.
          DATA(name) = reader->name.
        WHEN if_sxml_node=>co_nt_value.
          DATA(value) = reader->value.
      ENDCASE.
    ENDDO.
  CATCH cx_sxml_state_error.
ENDTRY.
```

---

## CALL TRANSFORMATION

### ABAP to XML

```abap
" Single data object
CALL TRANSFORMATION id
  SOURCE data = my_data
  RESULT XML DATA(xml).

" Multiple sources
CALL TRANSFORMATION id
  SOURCE obj1 = data1 obj2 = data2
  RESULT XML xml.

" Dynamic specification
DATA(srctab) = VALUE abap_trans_srcbind_tab(
  ( name = 'DATA' value = REF #( my_data ) ) ).
CALL TRANSFORMATION id
  SOURCE (srctab)
  RESULT XML xml.
```

### XML to ABAP

```abap
" Single target
CALL TRANSFORMATION id
  SOURCE XML xml
  RESULT data = my_data.

" Dynamic specification
DATA(restab) = VALUE abap_trans_resbind_tab(
  ( name = 'DATA' value = REF #( my_data ) ) ).
CALL TRANSFORMATION id
  SOURCE XML xml
  RESULT (restab).
```

---

## JSON Processing

### Creating JSON with sXML

```abap
DATA(writer) = CAST if_sxml_writer(
  cl_sxml_string_writer=>create( type = if_sxml=>co_xt_json ) ).

TRY.
    writer->open_element( name = 'object' ).
    writer->open_element( name = 'str' ).
    writer->write_attribute( name = 'name' value = 'key' ).
    writer->write_value( 'value' ).
    writer->close_element( ).
    writer->close_element( ).
  CATCH cx_sxml_state_error.
ENDTRY.

DATA(json) = cl_abap_conv_codepage=>create_in( )->convert(
  CAST cl_sxml_string_writer( writer )->get_output( ) ).
```

### CALL TRANSFORMATION for JSON

```abap
" ABAP to JSON
DATA(json_writer) = cl_sxml_string_writer=>create( type = if_sxml=>co_xt_json ).
CALL TRANSFORMATION id
  SOURCE data = my_data
  RESULT XML json_writer.
DATA(json) = json_writer->get_output( ).

" Using SOURCE/RESULT JSON
CALL TRANSFORMATION id
  SOURCE data = my_data
  RESULT JSON DATA(json_xstr).

" JSON to ABAP
CALL TRANSFORMATION id
  SOURCE JSON json_xstr
  RESULT data = my_data.
```

### Formatted JSON Output

```abap
DATA(writer) = CAST if_sxml_writer(
  cl_sxml_string_writer=>create( type = if_sxml=>co_xt_json ) ).
writer->set_option( option = if_sxml_writer=>co_opt_linebreaks ).
writer->set_option( option = if_sxml_writer=>co_opt_indent ).

CALL TRANSFORMATION id
  SOURCE data = my_data
  RESULT XML writer.
```

---

## XCO Library for JSON

```abap
" ABAP to JSON
DATA(json) = xco_cp_json=>data->from_abap( my_data )->to_string( ).

" JSON to ABAP
xco_cp_json=>data->from_string( json )->write_to( REF #( my_data ) ).

" Build JSON manually
DATA(builder) = xco_cp_json=>data->builder( ).
builder->begin_object( )
  ->add_member( 'key' )->add_string( 'value' )
  ->add_member( 'number' )->add_number( 123 )
  ->end_object( ).
DATA(json_built) = builder->get_data( )->to_string( ).

" Name transformation
xco_cp_json=>data->from_string( json )->apply( VALUE #(
  ( xco_cp_json=>transformation->pascal_case_to_underscore )
) )->write_to( REF #( my_data ) ).
```

---

## /ui2/cl_json Class

```abap
" Serialize (ABAP to JSON)
DATA(json) = /ui2/cl_json=>serialize( data = my_data ).

" With formatting
DATA(json_pretty) = /ui2/cl_json=>serialize(
  data = my_data
  format_output = abap_true
  pretty_name = /ui2/cl_json=>pretty_mode-camel_case ).

" Deserialize (JSON to ABAP)
/ui2/cl_json=>deserialize(
  EXPORTING json = json
  CHANGING data = my_data ).

" With name mapping
/ui2/cl_json=>deserialize(
  EXPORTING json = json
  name_mappings = VALUE #(
    ( abap = 'FIELD1' json = 'field_one' )
    ( abap = 'FIELD2' json = 'fieldTwo' ) )
  CHANGING data = my_data ).

" Generate ABAP type from JSON
DATA(dref) = /ui2/cl_json=>generate( json = json ).
```

---

## String/XString Conversion

```abap
" String to xstring
DATA(xstr) = cl_abap_conv_codepage=>create_out( codepage = 'UTF-8' )->convert( str ).

" XString to string
DATA(str) = cl_abap_conv_codepage=>create_in( )->convert( xstr ).

" Using XCO
DATA(xstr_xco) = xco_cp=>string( str )->as_xstring( xco_cp_character=>code_page->utf_8 )->value.
DATA(str_xco) = xco_cp=>xstring( xstr )->as_string( xco_cp_character=>code_page->utf_8 )->value.
```

---

## Compression

```abap
" Compress
cl_abap_gzip=>compress_binary(
  EXPORTING raw_in = xstr
  IMPORTING gzip_out = compressed ).

" Decompress
cl_abap_gzip=>decompress_binary(
  EXPORTING gzip_in = compressed
  IMPORTING raw_out = decompressed ).
```

---

## Object Serialization

Class must implement `IF_SERIALIZABLE_OBJECT`:

```abap
CLASS zcl_demo DEFINITION.
  PUBLIC SECTION.
    INTERFACES if_serializable_object.
    DATA value TYPE string.
ENDCLASS.

" Serialize
DATA(obj) = NEW zcl_demo( ).
obj->value = 'test'.
CALL TRANSFORMATION id SOURCE obj = obj RESULT XML DATA(xml).

" Deserialize
DATA obj2 TYPE REF TO zcl_demo.
CALL TRANSFORMATION id SOURCE XML xml RESULT obj = obj2.
```

---

## Best Practices

1. **Use sXML** for memory efficiency with large documents
2. **Use XCO/ui2/cl_json** for simple JSON operations
3. **Use CALL TRANSFORMATION** for complex conversions
4. **Handle encoding** explicitly (UTF-8 recommended)
5. **Implement IF_SERIALIZABLE_OBJECT** for object serialization
