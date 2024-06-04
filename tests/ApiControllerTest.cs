using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Kloud.Common.Service.Api.Test
{
    public abstract class ApiControllerTest<TController>
    {
        [SuppressMessage("Design", "CA1000:Do not declare static members on generic types", Justification = "By design")]
        public static IEnumerable<object[]> Data
            => typeof(TController).GetMethods(BindingFlags.Public       |
                                              BindingFlags.DeclaredOnly |
                                              BindingFlags.Instance)
                                  .Select(x => new[]
                                  {
                                      new MethodWrapper(x),
                                  })
                                  .ToArray();

        [Theory]
        [MemberData(nameof(Data))]
        public void ConsumesFromFormBinding(MethodWrapper method)
        {
            if (method is null)
                throw new ArgumentNullException(nameof(method));

            var consumesAttributes = method.Method.GetCustomAttributes(typeof(ConsumesAttribute), false)
                                           .Cast<ConsumesAttribute>();

            var parameters = method.Method.GetParameters()
                                   .Where(x => x.GetCustomAttributes(typeof(FromFormAttribute), false).Length != 0)
                                   .ToArray();

            var hasConsumesAttribute     = consumesAttributes.Any(x => x.ContentTypes.Contains("application/x-www-form-urlencoded"));
            var fromFormFileParameter    = parameters.FirstOrDefault(x => x.ParameterType != typeof(IFormFile));
            var hasFromFormFileParameter = parameters.Any() && (fromFormFileParameter != default);

            var hasBoth    = hasConsumesAttribute  && hasFromFormFileParameter;
            var hasNeither = !hasConsumesAttribute && !hasFromFormFileParameter;

            var reason =
                $"{method.Method.Name}: Should have {nameof(ConsumesAttribute)} because of {nameof(FromFormAttribute)} on {fromFormFileParameter?.Name ?? "unknown"} parameter";

            (hasBoth || hasNeither).Should().BeTrue(reason);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void ReturnsDeclaredType(MethodWrapper method)
        {
            if (method is null)
                throw new ArgumentNullException(nameof(method));

            var successAttributeType = method.Method.GetCustomAttributes(typeof(ProducesResponseTypeAttribute), false)
                                             .Cast<ProducesResponseTypeAttribute>()
                                             .FirstOrDefault(x => x.StatusCode == (int)HttpStatusCode.OK)
                                             ?.Type;

            if (successAttributeType == null)
                return;

            Type methodReturnType;

            if (method.Method.ReturnType == typeof(Task))
                methodReturnType = typeof(void);
            else if (method.Method.ReturnType.IsGenericType && (method.Method.ReturnType.GetGenericTypeDefinition() == typeof(Task<>)))
                methodReturnType = method.Method.ReturnType.GenericTypeArguments[0];
            else
                methodReturnType = method.Method.ReturnType;

            CompareTypes(method.Method.Name, successAttributeType, methodReturnType);
        }

        protected virtual void CompareTypes(string methodName, Type declared, Type returned)
        {
            if (declared is null)
                throw new ArgumentNullException(nameof(declared));

            if (returned is null)
                throw new ArgumentNullException(nameof(returned));

            var reason = $"{methodName}: Should match return types with its success attribute";

            returned.Should().Be(declared, reason);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void ThrowsUnauthorizedException(MethodWrapper method)
        {
            if (method is null)
                throw new ArgumentNullException(nameof(method));

            var attributeType = method.Method.GetCustomAttributes(typeof(ProducesResponseTypeAttribute), false)
                                             .Cast<ProducesResponseTypeAttribute>()
                                             .FirstOrDefault(x => x.StatusCode == (int)HttpStatusCode.Unauthorized)
                                             ?.Type;

            if (attributeType == null)
                return;

            Assert.True(typeof(UnauthorizedException).IsAssignableFrom(attributeType), $"{method.Method.Name}: Expected exception derived from {typeof(UnauthorizedException)}, however {attributeType} was given");
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void ThrowsForbiddenException(MethodWrapper method)
        {
            if (method is null)
                throw new ArgumentNullException(nameof(method));

            var attributeType = method.Method.GetCustomAttributes(typeof(ProducesResponseTypeAttribute), false)
                                      .Cast<ProducesResponseTypeAttribute>()
                                      .FirstOrDefault(x => x.StatusCode == (int)HttpStatusCode.Forbidden)
                                      ?.Type;

            if (attributeType == null)
                return;

            Assert.True(typeof(ForbiddenException).IsAssignableFrom(attributeType), $"{method.Method.Name}: Expected exception derived from {typeof(ForbiddenException)}, however {attributeType} was given");
        }

        #region Types

        [SuppressMessage("Design", "CA1034:Nested types should not be visible", Justification = "By design")]
        public class MethodWrapper
        {
            public MethodWrapper(MethodInfo method)
            {
                Method = method ?? throw new ArgumentNullException(nameof(method));
            }

            public MethodInfo Method { get; }

            public override string ToString()
                => Method.Name;
        }

        #endregion
    }
}
