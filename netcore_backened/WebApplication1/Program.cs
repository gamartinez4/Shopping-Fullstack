using WebApplication1.Infrastructure.db;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Core.Application.Interfaces;
using WebApplication1.Infrastructure.Persistence.Repositories;
using WebApplication1.Api.GraphQl.Queries;
using WebApplication1.Api.GraphQl.Mutations;
using WebApplication1.Infrastructure.api;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la base de datos
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro de repositorios
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductsRepository, ProductRepository>();
builder.Services.AddScoped<IOrdersRepository, OrderRepository>();

// Configuración de GraphQL
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddHttpRequestInterceptor<CustomRequestInterceptor>();

// Configuración de CORS
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

var app = builder.Build();

// Configuración del pipeline de la aplicación
app.MapGraphQL("/graphql");
app.UseCors();

app.Run();
