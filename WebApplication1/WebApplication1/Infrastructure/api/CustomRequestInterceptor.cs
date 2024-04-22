using HotChocolate.AspNetCore;
using HotChocolate.Execution;

namespace WebApplication1.Infrastructure.api
{
    public sealed class CustomRequestInterceptor : DefaultHttpRequestInterceptor
    {
        public override ValueTask OnCreateAsync(
            HttpContext context,
            IRequestExecutor requestExecutor,
            IQueryRequestBuilder requestBuilder,
            CancellationToken cancellationToken)
        {
            if (context.Request.Headers.TryGetValue("auth", out var value))
            {
                requestBuilder.SetGlobalState("auth", value.ToString());
            }

            return base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
        }
    }

}
