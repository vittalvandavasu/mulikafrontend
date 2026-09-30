# Search result actions

Each manuscript result has Prepare yourself, Buy herbs and/or concoction, and Customize for me actions.

Prepare yourself displays the record's preparation text, source safety label and a link to its exact source page. No generated dosage or recipe adjustments are added.

Age and gender are optional dropdowns inside the search composer. The context snapshot attached to a submitted search initializes the purchase/customization form. Source matching and existing API contracts are unchanged.

Purchase/customization starts with Herbs only, Prepared concoction, or Both. Clicking Order opens the optional pre-existing ailments form. Review draft shows the selection, source reference and demographic/ailment context. Back/edit controls preserve the draft while the dialog stays open. Closing clears health-form data; no health details are stored or sent.

Current integration limit: the repository has no commerce service or clinical review workflow. The flow explicitly says it is a draft; it has no checkout, payment, inventory promise, order submission or automatic medical personalization. Production ordering needs product/stock/pricing data, checkout and fulfilment endpoints, and a qualified suitability review workflow.

Components: SearchContext, ResultActions, ResultJourney, SearchHero, SearchResultsView.

Verification covers preparation source text, context carryover, purchase selection, ailments shown only after Order, draft review, no-ailments selection, clearing after close, static search and responsive layouts.
