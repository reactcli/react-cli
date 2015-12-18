'use strict'

module.exports = {
    description: "A basic React component",

    generateReplacements(args) {
        let propTypes = "";
        let defaultProps = "";

        if(args.length) {
            propTypes = "__name__.propTypes = {";
            defaultProps = "\n    getDefaultProps() {\n        return {";

            for(let index in args) {
                let prop = args[index];
                let parts = prop.split(':');
                if(parts.length != 2) {
                    throw new Error(`Prop ${prop} is formatted incorrectly`);
                }
                propTypes += `\n    ${parts[0]}: ${this.reactPropTypeFrom(parts[1])},`;
                defaultProps += `\n            ${parts[0]}: ${this.reactDefaultPropFrom(parts[1])},`;
            }

            propTypes += "\n}\n";
            defaultProps += "\n        }\n    }\n";
        }

        return {'__proptypes__': propTypes, '__defaultprops__': defaultProps };
    },

    reactPropTypeFrom(prop) {
        return 'React.PropTypes.' + prop;
    },

    reactDefaultPropFrom(prop) {
        switch(prop) {
            case 'number':
                return '0';
            case 'string':
                return "''";
            case 'array':
                return '[]';
            case 'bool':
                return 'false';
            case 'func':
            case 'object':
            case 'shape':
                return 'null';
            default:
                throw new Error(`Unsupported propType ${prop}`);
        }
    }
}
