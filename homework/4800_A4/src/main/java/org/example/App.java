package org.example;

import org.apache.commons.math3.distribution.NormalDistribution;

public class App 
{
    public static void main( String[] args )
    {
        System.out.println(normalDistributionRandom(10,3));
    }

    public static Double normalDistributionRandom(Integer mean, Integer dev) {
        NormalDistribution normalDistribution = new NormalDistribution(mean, dev);
        return normalDistribution.sample();
    }
}
