# ABAP String Processing - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/07_String_Processing.md

---

## String Data Types

| Type | Description | Length | Initial Value |
|------|-------------|--------|---------------|
| `string` | Variable-length text | Dynamic (up to 2GB) | Empty string |
| `c` | Fixed-length text | 1-262,143 chars | Blanks |
| `n` | Numeric characters | Digits 0-9 only | Zeros |
| `d` | Date field | 8 chars (YYYYMMDD) | '00000000' |
| `t` | Time field | 6 chars (HHMMSS) | '000000' |
| `x` | Fixed-length bytes | Raw byte data | Hex zeros |
| `xstring` | Variable-length bytes | Dynamic | Empty |

---

## Declaration and Literals

```abap
" String declaration
DATA str TYPE string.
DATA str VALUE `initial value`.
DATA(inline_str) = `Hello`.
FINAL(immutable) = `constant`.

" Fixed-length character
DATA char TYPE c LENGTH 10.
DATA char(10) TYPE c VALUE 'fixed text'.

" Literals
DATA(text_field) = 'single quotes'.      " Type c, trailing blanks trimmed
DATA(text_string) = `backquotes`.         " Type string, blanks preserved

" Escape backquote in string
DATA(escaped) = `This is a backquote: ``.`.
```

---

## String Templates

```abap
" Basic syntax with pipes and curly braces
DATA(msg) = |Hello { name }!|.
DATA(result) = |Value: { value }, Status: { status }|.

" Control characters
DATA(multiline) = |Line 1\nLine 2\nLine 3|.
DATA(tabbed) = |Col1\tCol2\tCol3|.

" Escape special characters with backslash
DATA(special) = |Pipe: \|, Backslash: \\, Brace: \{|.
```

### Formatting Options

```abap
" Date formatting
DATA(date_iso) = |{ sy-datum DATE = ISO }|.         " 2024-01-15
DATA(date_user) = |{ sy-datum DATE = USER }|.       " Per user settings

" Time formatting
DATA(time_iso) = |{ sy-uzeit TIME = ISO }|.         " 14:30:00

" Case transformation
DATA(upper) = |{ text CASE = UPPER }|.
DATA(lower) = |{ text CASE = LOWER }|.

" Width and alignment
DATA(left) = |{ text WIDTH = 20 ALIGN = LEFT }|.
DATA(right) = |{ text WIDTH = 20 ALIGN = RIGHT }|.
DATA(center) = |{ text WIDTH = 20 ALIGN = CENTER }|.

" Padding
DATA(padded) = |{ num WIDTH = 10 PAD = '0' }|.

" Number formatting
DATA(decimals) = |{ amount DECIMALS = 2 }|.
DATA(sign) = |{ amount SIGN = LEFT }|.
DATA(no_zero) = |{ 0 ZERO = NO }|.                  " Empty if zero

" Alpha conversion (leading zeros)
DATA(with_zeros) = |{ '1234' ALPHA = IN WIDTH = 10 }|.   " 0000001234
DATA(no_zeros) = |{ '00001234' ALPHA = OUT }|.            " 1234

" Scientific notation
DATA(scientific) = |{ number STYLE = SCIENTIFIC }|.
```

---

## String Length

```abap
" strlen - includes trailing blanks for string, not for c
DATA(len_c) = strlen( 'abc   ' ).         " 3
DATA(len_str) = strlen( `abc   ` ).       " 6

" numofchar - excludes trailing blanks for all types
DATA(chars_c) = numofchar( 'abc   ' ).    " 3
DATA(chars_str) = numofchar( `abc   ` ).  " 3

" xstrlen - byte length for byte strings
DATA(bytes) = xstrlen( xstr ).
```

---

## Concatenation

```abap
" && operator
DATA(full) = first && ` ` && last.
DATA(url) = `https://` && domain && `/` && path.

" &&= assignment operator
text &&= ` additional`.

" CONCATENATE statement
CONCATENATE str1 str2 INTO result.
CONCATENATE str1 str2 str3 INTO result SEPARATED BY `,`.
CONCATENATE 'a  ' 'b  ' 'c  ' INTO result RESPECTING BLANKS.

" Concatenate table lines
CONCATENATE LINES OF itab INTO result.
CONCATENATE LINES OF itab INTO result SEPARATED BY `,`.

" concat_lines_of function
DATA(joined) = concat_lines_of( table = itab ).
DATA(joined_sep) = concat_lines_of( table = itab sep = `, ` ).
```

---

## Splitting

```abap
" SPLIT into variables
SPLIT text AT `,` INTO part1 part2 part3.

" SPLIT into table
SPLIT text AT `,` INTO TABLE itab.

" segment function - get specific part
DATA(second) = segment( val = text index = 2 sep = `,` ).
```

---

## Case Transformation

```abap
" String functions (return new string)
DATA(upper_text) = to_upper( text ).
DATA(lower_text) = to_lower( text ).

" TRANSLATE statement (modifies source)
TRANSLATE text TO UPPER CASE.
TRANSLATE text TO LOWER CASE.
```

---

## Shifting and Condensing

```abap
" SHIFT statement
SHIFT text.                              " 1 place left
SHIFT text BY 3 PLACES LEFT.
SHIFT text BY 3 PLACES RIGHT.
SHIFT text BY 3 PLACES LEFT CIRCULAR.    " Wrap around
SHIFT text UP TO 'abc'.                  " Shift to substring
SHIFT text LEFT DELETING LEADING ` `.
SHIFT text RIGHT DELETING TRAILING ` `.

" shift_left/shift_right functions
DATA(shifted) = shift_left( val = text places = 3 ).
DATA(shifted) = shift_left( val = text circular = 2 ).
DATA(shifted) = shift_right( val = text sub = ` ` ).

" CONDENSE statement
CONDENSE text.                           " Remove leading/trailing, compress
CONDENSE text NO-GAPS.                   " Remove all blanks

" condense function
DATA(condensed) = condense( text ).
DATA(condensed) = condense( val = text to = `` ).  " No-gaps effect
DATA(condensed) = condense( val = text del = `#` from = `x` to = `y` ).
```

---

## Substring Operations

```abap
" substring function
DATA(sub) = substring( val = text off = 5 ).         " From position 5 to end
DATA(sub) = substring( val = text len = 3 ).         " First 3 chars
DATA(sub) = substring( val = text off = 5 len = 3 ). " 3 chars from position 5

" Direct offset/length notation
DATA(first5) = text(5).
DATA(from3) = text+3.
DATA(from3_len5) = text+3(5).
DATA(rest) = text+5(*).                              " * = rest of string

" Modify substring
text(5) = 'Hello'.
text+3(3) = '###'.

" Advanced substring functions
DATA(after) = substring_after( val = text sub = `prefix` ).
DATA(before) = substring_before( val = text sub = `suffix` ).
DATA(from) = substring_from( val = text sub = `start` ).
DATA(to) = substring_to( val = text sub = `end` ).
```

---

## Finding Substrings

### find Function

```abap
" Basic search (returns offset or -1)
DATA(pos) = find( val = text sub = `search` ).

" Case-insensitive
DATA(pos) = find( val = text sub = `SEARCH` case = abap_false ).

" Occurrence (1 = first, 2 = second, -1 = last)
DATA(pos) = find( val = text sub = `x` occ = 2 ).
DATA(pos) = find( val = text sub = `x` occ = -1 ).  " From right

" With offset and length
DATA(pos) = find( val = text sub = `x` off = 5 len = 10 ).

" Find end position
DATA(end_pos) = find_end( val = text sub = `search` ).
```

### FIND Statement

```abap
" Basic find
FIND 'pattern' IN text.
IF sy-subrc = 0.
  " Found
ENDIF.

" With result information
FIND FIRST OCCURRENCE OF `pattern` IN text
  MATCH COUNT DATA(count)
  MATCH OFFSET DATA(offset)
  MATCH LENGTH DATA(length).

" All occurrences
FIND ALL OCCURRENCES OF `pattern` IN text
  MATCH COUNT DATA(total_count)
  RESULTS DATA(match_results).

" With section
FIND ALL OCCURRENCES OF `x` IN SECTION OFFSET 5 LENGTH 20 OF text
  MATCH COUNT DATA(cnt).

" Case sensitivity
FIND `ABC` IN text IGNORING CASE MATCH OFFSET DATA(off).
FIND `ABC` IN text RESPECTING CASE MATCH OFFSET DATA(off).

" Regular expression
FIND FIRST OCCURRENCE OF PCRE `\d+` IN text
  MATCH OFFSET DATA(num_offset)
  MATCH LENGTH DATA(num_length).

" In table
FIND ALL OCCURRENCES OF `pattern` IN TABLE itab
  RESULTS DATA(table_results).
```

---

## Character Set Operations

### Comparison Operators

```abap
" CA - Contains Any
IF text CA 'aeiou'.                " Contains any vowel
  DATA(pos) = sy-fdpos.            " Position of first match
ENDIF.

" NA - Not Contains Any (negation of CA)
IF text NA 'xyz'.
  " Contains none of x, y, z
ENDIF.

" CO - Contains Only
IF text CO '0123456789'.           " Only digits
ENDIF.

" CN - Contains Not Only
IF text CN 'abc'.                  " Contains other than a, b, c
ENDIF.

" CS - Contains String
IF text CS 'pattern'.              " Case-insensitive substring
ENDIF.

" NS - Not Contains String
IF text NS 'pattern'.
ENDIF.

" CP - Conforms to Pattern
IF text CP '*test*'.               " * = any chars, + = single char
ENDIF.
```

### Character Functions

```abap
" find_any_of - offset of first occurrence of any character
DATA(pos) = find_any_of( val = text sub = `aeiou` ).

" find_any_not_of - offset of first char not in set
DATA(pos) = find_any_not_of( val = text sub = `0123456789` ).

" count - occurrences of substring
DATA(cnt) = count( val = text sub = `a` ).

" count_any_of - occurrences of any character in set
DATA(cnt) = count_any_of( val = text sub = `aeiou` ).

" count_any_not_of - occurrences of chars not in set
DATA(cnt) = count_any_not_of( val = text sub = `aeiou` ).
```

---

## Replacing

### replace Function

```abap
" First occurrence
DATA(result) = replace( val = text sub = `old` with = `new` ).

" All occurrences (occ = 0)
DATA(result) = replace( val = text sub = `old` with = `new` occ = 0 ).

" Specific occurrence
DATA(result) = replace( val = text sub = `x` with = `y` occ = 2 ).

" From right (negative occ)
DATA(result) = replace( val = text sub = `x` with = `y` occ = -1 ).

" Case-insensitive
DATA(result) = replace( val = text sub = `OLD` with = `new` case = abap_false ).

" Position-based (when sub not specified)
DATA(result) = replace( val = text with = `new` off = 5 len = 3 ).
```

### REPLACE Statement

```abap
" First occurrence
REPLACE 'old' IN text WITH 'new'.

" All occurrences
REPLACE ALL OCCURRENCES OF 'old' IN text WITH 'new'.

" With results
REPLACE ALL OCCURRENCES OF 'old' IN text WITH 'new'
  REPLACEMENT COUNT DATA(count)
  REPLACEMENT OFFSET DATA(offset)
  REPLACEMENT LENGTH DATA(length)
  RESULTS DATA(results).

" Case-insensitive
REPLACE ALL OCCURRENCES OF 'OLD' IN text WITH 'new' IGNORING CASE.

" Section replacement
REPLACE SECTION OFFSET 5 LENGTH 3 OF text WITH 'new'.

" In table
REPLACE ALL OCCURRENCES OF 'old' IN TABLE itab WITH 'new'.
```

### translate Function

```abap
" Character-by-character replacement
DATA(result) = translate( val = text from = `abc` to = `xyz` ).
" a->x, b->y, c->z

" TRANSLATE statement
TRANSLATE text USING 'axbycz'.    " Pairs: a->x, b->y, c->z
```

---

## Regular Expressions

```abap
" FIND with PCRE
FIND FIRST OCCURRENCE OF PCRE `\d{3}-\d{4}` IN text
  MATCH OFFSET DATA(off)
  MATCH LENGTH DATA(len).

FIND ALL OCCURRENCES OF PCRE `[a-z]+` IN text
  RESULTS DATA(matches).

" REPLACE with PCRE
REPLACE ALL OCCURRENCES OF PCRE `\s+` IN text WITH ` `.

" Backreferences
REPLACE ALL OCCURRENCES OF PCRE `(\w+)\s+\1` IN text WITH `$1`.

" String functions with PCRE
DATA(pos) = find( val = text pcre = `\d+` ).
DATA(result) = replace( val = text pcre = `\s+` with = `-` occ = 0 ).
DATA(matched) = match( val = text pcre = `[A-Z]+` ).

" Class-based approach
DATA(regex) = cl_abap_regex=>create_pcre( pattern = `\d+` ).
DATA(matcher) = regex->create_matcher( text = text ).
DATA(results) = matcher->find_all( ).
```

---

## Other String Functions

```abap
" Reverse
DATA(reversed) = reverse( text ).

" Insert
DATA(result) = insert( val = text sub = `new` off = 5 ).

" Repeat
DATA(repeated) = repeat( val = `abc` occ = 3 ).  " abcabcabc

" String comparison (min/max)
DATA(smallest) = cmin( val1 = str1 val2 = str2 val3 = str3 ).
DATA(biggest) = cmax( val1 = str1 val2 = str2 val3 = str3 ).

" Levenshtein distance
DATA(dist) = distance( val1 = `abap` val2 = `abac` ).

" Escape special characters
DATA(escaped) = escape( val = text format = cl_abap_format=>e_url_full ).
DATA(json_safe) = escape( val = text format = cl_abap_format=>e_json_string ).
DATA(template_safe) = escape( val = text format = cl_abap_format=>e_string_tpl ).
```

---

## Utility Classes

```abap
" CL_ABAP_STRING_UTILITIES
cl_abap_string_utilities=>del_trailing_blanks( CHANGING str = text ).
text = cl_abap_string_utilities=>c2str_preserving_blanks( char ).

" CL_ABAP_CHAR_UTILITIES
DATA(cr) = cl_abap_char_utilities=>cr_lf.
DATA(tab) = cl_abap_char_utilities=>horizontal_tab.
DATA(newline) = cl_abap_char_utilities=>newline.
```
