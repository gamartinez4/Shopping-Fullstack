using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using WebApplication1.Infrastructure.api;
using WebApplication1.Infrastructure.api.Types;
using WebApplication1.Infrastructure.db;
using WebApplication1.Repository;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<ProductsRepository>();
builder.Services.AddScoped<OrdersRepository>();
builder.Services.AddGraphQLServer()
    .AddQueryType<QueryQl>()
    .AddMutationType<MutationQl>()
    .AddHttpRequestInterceptor<CustomRequestInterceptor>();
builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(
            builder =>
            {
                builder.WithOrigins("http://localhost:3000") // El origen del cliente React
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
    });

    // ...
var app = builder.Build();
app.MapGraphQL("/graphql");
app.UseCors();
app.Run();
