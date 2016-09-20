Mock.mock(/bardata/, {
    'category|10': ['@name'],
    'series|2': [{
        'name' : '@name',
        'data|10' : ['@integer(60, 100)']
    }]
});
