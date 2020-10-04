import merge from 'webpack-merge';
import production from './production';

import {
    BundleAnalyzerPlugin
} from 'webpack-bundle-analyzer';

export default merge(production, {

    plugins: [
    
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'harlem-bundle-report.html'
        })

    ]
});
