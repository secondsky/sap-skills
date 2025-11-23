# Generative AI in ABAP - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/30_Generative_AI.md

---

## Overview

The ABAP AI SDK enables integration of large language models into ABAP applications through the Intelligent Scenario Lifecycle Management (ISLM) framework.

### Prerequisites

- Administrative setup via ISLM documentation
- Creation of intelligent scenarios (ABAP repository objects)
- Definition of LLM and prompt templates

---

## Basic Usage

### Simple Execution

```abap
TRY.
    FINAL(ai_api) = cl_aic_islm_compl_api_factory=>get(
      )->create_instance( 'ZDEMO_ABAP_INT_SCEN' ).

    FINAL(result) = ai_api->execute_for_string( `Tell me a joke.` ).
    FINAL(completion) = result->get_completion( ).

  CATCH cx_aic_api_factory cx_aic_completion_api INTO FINAL(error).
    FINAL(error_text) = error->get_text( ).
ENDTRY.
```

---

## Parameter Configuration

```abap
FINAL(params) = ai_api->get_parameter_setter( ).
params->set_maximum_tokens( 500 ).
params->set_temperature( '0.5' ).
```

---

## Message-Based Prompting

```abap
FINAL(message_container) = ai_api->create_message_container( ).

" Set system role
message_container->set_system_role( `You are a professional translator` ).

" Add user message
message_container->add_user_message( `Can you translate German into English?` ).

" Execute with messages
FINAL(llm_answer) = ai_api->execute_for_messages( message_container
  )->get_completion( ).
```

---

## Prompt Templates

```abap
FINAL(prompt_temp) = cl_aic_islm_prompt_tpl_factory=>get(
  )->create_instance(
    islm_scenario = islm_scenario
    template_id   = prompt_template ).

FINAL(prompt) = prompt_temp->get_prompt( ).
```

---

## Result Analytics

```abap
FINAL(llm_result) = ai_api->execute_for_string( prompt ).

" Token usage
FINAL(completion_tokens) = llm_result->get_completion_token_count( ).
FINAL(prompt_tokens) = llm_result->get_prompt_token_count( ).

" Runtime
FINAL(runtime_ms) = llm_result->get_runtime_ms( ).

" Get completion text
FINAL(completion) = llm_result->get_completion( ).
```

---

## Exception Handling

```abap
TRY.
    " AI operations
  CATCH cx_aic_api_factory INTO DATA(factory_error).
    " Factory creation error
  CATCH cx_aic_completion_api INTO DATA(completion_error).
    " API execution error
  CATCH cx_aic_prompt_template INTO DATA(template_error).
    " Prompt template error
ENDTRY.
```

---

## Complete Example

```abap
CLASS zcl_ai_demo DEFINITION
  PUBLIC FINAL CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
ENDCLASS.

CLASS zcl_ai_demo IMPLEMENTATION.

  METHOD if_oo_adt_classrun~main.
    TRY.
        " Create AI API instance
        DATA(ai_api) = cl_aic_islm_compl_api_factory=>get(
          )->create_instance( 'ZDEMO_AI_SCENARIO' ).

        " Configure parameters
        DATA(params) = ai_api->get_parameter_setter( ).
        params->set_maximum_tokens( 1000 ).
        params->set_temperature( '0.7' ).

        " Create message container
        DATA(messages) = ai_api->create_message_container( ).
        messages->set_system_role( `You are a helpful assistant.` ).
        messages->add_user_message( `Explain ABAP in one paragraph.` ).

        " Execute and get result
        DATA(result) = ai_api->execute_for_messages( messages ).

        " Output results
        out->write( result->get_completion( ) ).
        out->write( |Tokens used: { result->get_completion_token_count( ) }| ).
        out->write( |Runtime: { result->get_runtime_ms( ) }ms| ).

      CATCH cx_aic_api_factory
            cx_aic_completion_api INTO DATA(error).
        out->write( |Error: { error->get_text( ) }| ).
    ENDTRY.
  ENDMETHOD.

ENDCLASS.
```

---

## Key Classes

| Class | Purpose |
|-------|---------|
| `CL_AIC_ISLM_COMPL_API_FACTORY` | Factory for AI API instances |
| `CL_AIC_ISLM_PROMPT_TPL_FACTORY` | Factory for prompt templates |
| `CX_AIC_API_FACTORY` | Factory exception |
| `CX_AIC_COMPLETION_API` | API execution exception |
| `CX_AIC_PROMPT_TEMPLATE` | Template exception |

---

## Documentation Links

- SAP Help: Joule for Developers, ABAP AI Capabilities
- SAP Help: Generative AI in ABAP Cloud
- GitHub: RAP120 - Build SAP Fiori Apps with ABAP Cloud and Joule
