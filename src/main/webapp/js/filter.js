var filterControls = [
  new nyc.Check({
    target: '#age-filter',
    title: 'Age group',
    expanded: true,
    choices: [{
      name: 'AGE_0-5',
      value: '1',
      label: 'Under 5 years old',
      checked: false
    }, {
      name: 'AGE_5-24',
      value: '1',
      label: '5 to 24 years old',
      checked: false
    }, {
      name: 'AGE_25-60',
      value: '1',
      label: '25 to 60 years old',
      checked: false
    }, {
      name: 'AGE_60+',
      value: '1',
      label: '60 years old and older',
      checked: false
    }]
  }),
  new nyc.Check({
    target: '#type-filter',
    title: 'Support for a victim of',
    expanded: true,
    choices: [{
      name: 'INTIMATE_PARTNER_VIOLENCE',
      value: '1',
      label: 'Intimate partner violence <a class="filter-info">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between a former husband/wife, boyfriend/girlfriend, child\'s mother/father or a partner that someone lives with or used to live with</div>',
      checked: false
    }, {
      name: 'FAMILY_VIOLENCE',
      value: '1',
      label: 'Family violence <a class="filter-info">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between family members</div>',
      checked: false
    }, {
      name: 'SEXUAL_ASSAULT',
      value: '1',
      label: 'Sexual assault',
      checked: false
    }, {
      name: 'VIOLENT_CRIME',
      value: '1',
      label: 'Violent crime',
      checked: false
    }, {
      name: 'PROPERTY/FINANCIAL_CRIMES',
      value: '1',
      label: 'Property/financial crime',
      checked: false
    }]
  })
];
