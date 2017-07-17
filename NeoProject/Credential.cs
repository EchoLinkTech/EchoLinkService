
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services.Neo;

namespace Neo.SmartContract
{
    public class CredentialCreate : FunctionCode
    {
        public static void Main()
        {
            Storage.Put(Storage.CurrentContext, \
            "Issuer", "26eab488ee5c135c92986e812e30f6869187498207ddb792152ab2dd6dda36a2", \
            "Recipient", "f7270129de63d4421e4ef1f315b2fdf26d5aa0b9b71ca4bafb1af438f9aa93fb"); //
        }
    }
}
